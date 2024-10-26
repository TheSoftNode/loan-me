// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2qUPQKC82Rdh5QaicU6C6_HJJzV7NPTY",
    authDomain: "loanme-app.firebaseapp.com",
    projectId: "loanme-app",
    storageBucket: "loanme-app.appspot.com",
    messagingSenderId: "253038793243",
    appId: "1:253038793243:web:7b1e63d1c6698250695ebe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;