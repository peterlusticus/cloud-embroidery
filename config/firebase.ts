import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithRedirect } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn_EqhijL1eXiZd_9Gp84tJub091O36CA",
    authDomain: "stickmaschine-datenbank.firebaseapp.com",
    databaseURL: "https://stickmaschine-datenbank-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "stickmaschine-datenbank",
    storageBucket: "stickmaschine-datenbank.appspot.com",
    messagingSenderId: "355392625068",
    appId: "1:355392625068:web:a9572073bac4027e944209",
    measurementId: "G-F7H8CVNG3K"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Set auth cookie
export const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

// Database
export const db = getDatabase();

// Storage
export const storage = getStorage();

