// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGa8gu8Fs8sf41MRHaTZR8rANASrwl5yA",
    authDomain: "email-password-git.firebaseapp.com",
    projectId: "email-password-git",
    storageBucket: "email-password-git.appspot.com",
    messagingSenderId: "246112240866",
    appId: "1:246112240866:web:a796cd28b3177643f98abb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;