export const getAuthErrorMessage = (error: any): string => {
    // Firebase auth error codes
    const errorCode = error?.code || '';
    
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'No account exists with this email. Please check your email or sign up.',
      'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled. Please contact support.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters long.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed before completion.',
      'auth/operation-not-allowed': 'This sign-in method is not enabled.',
      'auth/invalid-credential': 'The provided credential is invalid.',
      'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in credentials.',
    };
  
    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  };