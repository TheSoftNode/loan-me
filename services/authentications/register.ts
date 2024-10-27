import { User as FirebaseUser, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";

// Interface for registration parameters
interface RegisterUserParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    acceptedTerms: boolean;
    photoURL?: string | null;
}

// Interface matching your User type
interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    photoURL: string | null;
    needsPasswordSetup: boolean;
    authMethods: string[];
    createdAt: string;
    lastLogin: string;
    acceptedTerms: boolean;
}

const DEFAULT_PHOTO_URL = "/default-avatar.png"; // Replace with your default avatar path

export const registerUser = async ({
    email,
    password,
    firstName,
    lastName,
    acceptedTerms,
    photoURL = DEFAULT_PHOTO_URL
}: RegisterUserParams): Promise<FirebaseUser> => {
    if (!acceptedTerms) {
        throw new Error("You must agree to the terms and conditions.");
    }

    try {
        // Check if email exists before attempting to create account
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
            throw new Error("This email is already registered. Please use a different email or try logging in.");
        }

        const userCredential: UserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user: FirebaseUser = userCredential.user;

        // Update Firebase user profile
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
            photoURL: photoURL
        });

        const currentTime = new Date().toISOString();

        // Create user document with all required fields from User interface
        const userData: UserData = {
            firstName,
            lastName,
            email,
            photoURL: photoURL,
            needsPasswordSetup: false, // false for email/password registration
            authMethods: ['password'], // Initialize with password auth method
            createdAt: currentTime,
            lastLogin: currentTime,
            acceptedTerms
        };

        await setDoc(doc(db, "users", user.uid), userData);

        return user;
    } catch (error: any) {
        // Handle specific Firebase errors
        if (error.code === 'auth/email-already-in-use') {
            throw new Error("This email is already registered. Please use a different email or try logging in.");
        } else if (error.code === 'auth/invalid-email') {
            throw new Error("Please enter a valid email address.");
        } else if (error.code === 'auth/operation-not-allowed') {
            throw new Error("Email/password accounts are not enabled. Please contact support.");
        } else if (error.code === 'auth/weak-password') {
            throw new Error("Please choose a stronger password.");
        }

        // If it's our custom error from the email check, throw it as is
        if (error.message.includes("already registered")) {
            throw error;
        }

        // For any other unexpected errors
        console.error("Registration error:", error);
        throw new Error("An unexpected error occurred during registration. Please try again.");
    }
};

// Helper function to update user's photo URL
export const updateUserPhoto = async (
    user: FirebaseUser,
    newPhotoURL: string
): Promise<void> => {
    try {
        // Update Firebase user profile
        await updateProfile(user, {
            photoURL: newPhotoURL
        });

        // Update Firestore document
        await setDoc(doc(db, "users", user.uid), {
            photoURL: newPhotoURL
        }, { merge: true });
    } catch (error) {
        console.error("Error updating photo URL:", error);
        throw new Error("Failed to update profile photo. Please try again.");
    }
};