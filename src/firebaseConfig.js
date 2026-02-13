// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Importing for potential future use as per Hero.jsx todo
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwPRDH6tiIXXn6aLOpA9vcyFAUlxOk8ic",
    authDomain: "techastra-14e42.firebaseapp.com",
    projectId: "techastra-14e42",
    storageBucket: "techastra-14e42.firebasestorage.app",
    messagingSenderId: "444657913878",
    appId: "1:444657913878:web:d369d9bc78a3aa54912537",
    measurementId: "G-4PXQCD3GK3",
    databaseURL: "https://techastra-14e42-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app, "https://techastra-14e42-default-rtdb.firebaseio.com/"); // Initialize Realtime Database with explicit URL
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, database, auth, googleProvider };
