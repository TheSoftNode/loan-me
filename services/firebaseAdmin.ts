import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

export class FirebaseAdminError extends Error
{
    constructor(
        message: string,
        public code: string,
        public status: number = 401
    )
    {
        super(message);
        this.name = 'FirebaseAdminError';
    }
}

// Initialize Firebase Admin
if (!admin.apps.length)
{
    try
    {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    } catch (error)
    {
        const errorMessage = error instanceof Error ? error.message : 'Firebase admin initialization failed';
        console.error('Firebase admin initialization error:', errorMessage);
        throw new FirebaseAdminError(
            'Firebase admin initialization failed',
            'admin/init-failed',
            500
        );
    }
}

export const verifyIdToken = async (token: string): Promise<DecodedIdToken> =>
{
    if (!token)
    {
        throw new FirebaseAdminError(
            'No token provided',
            'auth/no-token',
            401
        );
    }

    try
    {
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (decodedToken.exp * 1000 < Date.now())
        {
            throw new FirebaseAdminError(
                'Token has expired',
                'auth/token-expired',
                401
            );
        }

        return decodedToken;
    } catch (error)
    {
        if (error instanceof FirebaseAdminError)
        {
            throw error;
        }

        if (error instanceof Error)
        {
            const firebaseError = error as any;

            switch (firebaseError.code)
            {
                case 'auth/argument-error':
                    throw new FirebaseAdminError(
                        'Invalid token format',
                        'auth/invalid-token-format',
                        401
                    );
                case 'auth/id-token-expired':
                    throw new FirebaseAdminError(
                        'Token has expired',
                        'auth/token-expired',
                        401
                    );
                case 'auth/id-token-revoked':
                    throw new FirebaseAdminError(
                        'Token has been revoked',
                        'auth/token-revoked',
                        401
                    );
                case 'auth/invalid-argument':
                case 'auth/invalid-id-token':
                    throw new FirebaseAdminError(
                        'Invalid token',
                        'auth/invalid-token',
                        401
                    );
                default:
                    throw new FirebaseAdminError(
                        'Token verification failed',
                        'auth/verification-failed',
                        401
                    );
            }
        }

        throw new FirebaseAdminError(
            'Authentication failed',
            'auth/unknown-error',
            401
        );
    }
};

export const checkAuthStatus = async (token: string): Promise<{
    isValid: boolean;
    decodedToken?: DecodedIdToken;
    error?: string;
}> =>
{
    try
    {
        const decodedToken = await verifyIdToken(token);
        return {
            isValid: true,
            decodedToken
        };
    } catch (error)
    {
        return {
            isValid: false,
            error: error instanceof FirebaseAdminError ? error.message : 'Authentication failed'
        };
    }
};

export { admin };