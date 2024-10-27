// import { User, UserCredential } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "./firebaseConfig";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// interface RegisterUserParams
// {
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     acceptedTerms: boolean;
// }

// interface UserData
// {
//     firstName: string;
//     lastName: string;
//     email: string;
//     acceptedTerms: boolean;
//     createdAt: string;
// }

// export const registerUser = async ({
//     email,
//     password,
//     firstName,
//     lastName,
//     acceptedTerms
// }: RegisterUserParams): Promise<User> =>
// {
//     if (!acceptedTerms)
//     {
//         throw new Error("You must agree to the terms and conditions.");
//     }

//     const userCredential: UserCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//     );
//     const user: User = userCredential.user;

//     await updateProfile(user, { displayName: `${firstName} ${lastName}` });

//     const userData: UserData = {
//         firstName,
//         lastName,
//         email,
//         acceptedTerms,
//         createdAt: new Date().toISOString()
//     };

//     await setDoc(doc(db, "users", user.uid), userData);

//     return user;
// };

import { User, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";

interface RegisterUserParams
{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    acceptedTerms: boolean;
}

interface UserData
{
    firstName: string;
    lastName: string;
    email: string;
    acceptedTerms: boolean;
    createdAt: string;
}

export const registerUser = async ({
    email,
    password,
    firstName,
    lastName,
    acceptedTerms
}: RegisterUserParams): Promise<User> =>
{
    if (!acceptedTerms)
    {
        throw new Error("You must agree to the terms and conditions.");
    }

    try
    {
        // Check if email exists before attempting to create account
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0)
        {
            throw new Error("This email is already registered. Please use a different email or try logging in.");
        }

        const userCredential: UserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user: User = userCredential.user;

        await updateProfile(user, { displayName: `${firstName} ${lastName}` });

        const userData: UserData = {
            firstName,
            lastName,
            email,
            acceptedTerms,
            createdAt: new Date().toISOString()
        };

        await setDoc(doc(db, "users", user.uid), userData);

        return user;
    } catch (error: any)
    {
        // Handle specific Firebase errors
        if (error.code === 'auth/email-already-in-use')
        {
            throw new Error("This email is already registered. Please use a different email or try logging in.");
        } else if (error.code === 'auth/invalid-email')
        {
            throw new Error("Please enter a valid email address.");
        } else if (error.code === 'auth/operation-not-allowed')
        {
            throw new Error("Email/password accounts are not enabled. Please contact support.");
        } else if (error.code === 'auth/weak-password')
        {
            throw new Error("Please choose a stronger password.");
        }

        // If it's our custom error from the email check, throw it as is
        if (error.message.includes("already registered"))
        {
            throw error;
        }

        // For any other unexpected errors
        console.error("Registration error:", error);
        throw new Error("An unexpected error occurred during registration. Please try again.");
    }
};