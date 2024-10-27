import { auth, db } from '@/services/firebaseConfig';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

interface PasswordSetupResponse
{
    success: boolean;
    message: string;
}

export const setupPassword = async (password: string): Promise<PasswordSetupResponse> =>
{
    try
    {
        const currentUser = auth.currentUser;
        if (!currentUser || !currentUser.email)
        {
            throw new Error('No authenticated user found');
        }

        // Create email credential
        const credential = EmailAuthProvider.credential(currentUser.email, password);

        // Link the email credential to the current user
        await linkWithCredential(currentUser, credential);

        // Get the current user document to check existing authMethods
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        // Merge existing authMethods with 'password' if not already present
        const existingAuthMethods = userData?.authMethods || [];
        const updatedAuthMethods = Array.from(new Set([...existingAuthMethods, 'password']));

        // Update Firestore with atomic update
        await updateDoc(userRef, {
            needsPasswordSetup: false,
            authMethods: updatedAuthMethods,
            lastUpdated: new Date().toISOString()
        });

        return {
            success: true,
            message: 'Password setup successful'
        };
    } catch (error)
    {
        console.error('Password setup error:', error);

        // Handle specific Firebase auth errors
        if (error instanceof Error)
        {
            if (error.message.includes('email-already-in-use'))
            {
                return {
                    success: false,
                    message: 'This email is already associated with a password'
                };
            }
            return {
                success: false,
                message: error.message
            };
        }
        return {
            success: false,
            message: 'Failed to set up password'
        };
    }
};