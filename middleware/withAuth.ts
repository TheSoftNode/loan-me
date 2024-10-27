import { NextRequest, NextResponse } from 'next/server';
import { DecodedIdToken } from 'firebase-admin/auth';
import { verifyIdToken, FirebaseAdminError } from '@/services/firebaseAdmin';

export interface AuthenticatedRequest extends NextRequest
{
    decodedToken?: DecodedIdToken;
}

export interface AuthErrorResponse
{
    error: string;
    code: string;
}

export async function withAuth(
    request: NextRequest,
    handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse>
{
    try
    {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split('Bearer ')[1];
        console.log(token)

        if (!token)
        {
            return NextResponse.json(
                {
                    error: 'No authentication token provided',
                    code: 'auth/no-token'
                },
                { status: 401 }
            );
        }

        try
        {
            const decodedToken = await verifyIdToken(token);

            // Add decoded token to request
            const authenticatedRequest = request as AuthenticatedRequest;
            authenticatedRequest.decodedToken = decodedToken;

            return handler(authenticatedRequest);

        } catch (error)
        {
            if (error instanceof FirebaseAdminError)
            {
                return NextResponse.json(
                    {
                        error: error.message,
                        code: error.code
                    },
                    { status: error.status }
                );
            }

            return NextResponse.json(
                {
                    error: 'Authentication failed',
                    code: 'auth/unknown'
                },
                { status: 401 }
            );
        }
    } catch (error)
    {
        return NextResponse.json(
            {
                error: 'Internal server error',
                code: 'server/internal-error'
            },
            { status: 500 }
        );
    }
}
