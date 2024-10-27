import
{
    Auth,
    UserCredential,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    sendSignInLinkToEmail,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getAuthErrorMessage } from "@/utils/authErrors";

// Email and Password Login
export const emailPasswordLogin = async (
    email: string,
    password: string
): Promise<UserCredential> =>
{
    try
    {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any)
    {
        // Transform Firebase error into a more user-friendly error
        const errorMessage = getAuthErrorMessage(error);
        throw new Error(errorMessage);
    }
};

// Google Login (Client-Side Only)
export const googleLogin = async (): Promise<UserCredential> =>
{
    if (typeof window === "undefined") throw new Error("Google login is only supported on the client side.");
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
};

// Passwordless Login (Client-Side Only)
export const passwordlessLogin = async (email: string): Promise<void> =>
{
    if (typeof window === "undefined") throw new Error("Passwordless login is only supported on the client side.");
    const actionCodeSettings = {
        url: `${window.location.origin}/api/auth/login`, // Change to your app URL
        handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
};
