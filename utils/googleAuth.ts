import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadProfilePhoto } from './photoUpload';
import { auth, db } from '@/services/firebaseConfig';
import { User } from '@/lib/type';
import toast from 'react-hot-toast';

interface GoogleAuthResponse
{
    user: User;
    token: string;
    isNewUser: boolean;
    needsPasswordSetup: boolean;
}

export const googleLogin = async (): Promise<UserCredential> =>
{
    if (typeof window === "undefined")
    {
        throw new Error("Google login is only supported on the client side.");
    }
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
};

const extractNameParts = (displayName: string | null): { firstName: string; lastName: string } =>
{
    if (!displayName)
    {
        return {
            firstName: '',
            lastName: ''
        };
    }

    const nameParts = displayName.trim().split(' ');
    return {
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || ''
    };
};

export const handleGoogleLogin = async (): Promise<GoogleAuthResponse> =>
{
    try
    {
        // 1. Perform Google sign in
        const credential = await googleLogin();
        const { user: firebaseUser } = credential;

        // 2. Get the ID token
        const token = await firebaseUser.getIdToken();

        // 3. Extract name parts from Google display name
        const { firstName, lastName } = extractNameParts(firebaseUser.displayName);

        // 4. Check if user exists in Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        const isNewUser = !userDoc.exists();

        // let photoURL = firebaseUser.photoURL;
        let needsPasswordSetup = false;

        // If there's a Google photo URL, upload it to Firebase Storage
        let photoURL = null;
        if (firebaseUser.photoURL)
        {
            try
            {
                photoURL = await uploadProfilePhoto(firebaseUser.uid, firebaseUser.photoURL);
            } catch (error)
            {
                console.error('Failed to upload profile photo:', error);
                // Fallback to original Google photo URL
                photoURL = firebaseUser.photoURL;

                // Log the specific error for debugging
                if (error instanceof Error)
                {
                    console.error('Upload error details:', {
                        message: error.message,
                        userId: firebaseUser.uid,
                        originalPhotoURL: firebaseUser.photoURL
                    });
                }

                // Optionally notify the user but don't block the login
                toast.error(
                    "Couldn't save your profile picture to our servers, but we'll use your Google photo for now.",
                    { duration: 5000 }
                );
            }
        }

        let userData: User;



        if (isNewUser)
        {
            // New user needs to set up password
            needsPasswordSetup = true;
            userData = {
                firstName,
                lastName,
                email: firebaseUser.email || '',
                photoURL,
                needsPasswordSetup: true,
                authMethods: ['google'],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            await setDoc(userRef, userData);
        } else
        {
            const existingData = userDoc.data() as User;
            needsPasswordSetup = existingData.needsPasswordSetup ?? !existingData.authMethods.includes('password');

            userData = {
                ...existingData,
                firstName,
                lastName,
                email: firebaseUser.email || '',
                photoURL,
                lastLogin: new Date().toISOString(),
                needsPasswordSetup
            };
            await setDoc(userRef, userData, { merge: true });
        }

        // Store token in localStorage
        localStorage.setItem('authToken', token);

        return {
            user: userData,
            token,
            isNewUser,
            needsPasswordSetup
        };
    } catch (error)
    {
        console.error('Google login error:', error);
        throw error;
    }
};