// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Importing for potential future use as per Hero.jsx todo

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwPRDH6tiIXXn6aLOpA9vcyFAUlxOk8ic",
    authDomain: "techastra-14e42.firebaseapp.com",
    projectId: "techastra-14e42",
    storageBucket: "techastra-14e42.firebasestorage.app",
    messagingSenderId: "444657913878",
    appId: "1:444657913878:web:d369d9bc78a3aa54912537",
    measurementId: "G-4PXQCD3GK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize Realtime Database

export { app, analytics, database };
