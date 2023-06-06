// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, EmailAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqHttX4m-NoT-623XJiICLk06AtWuO-ec",
  authDomain: "slack-app-clone-548f9.firebaseapp.com",
  projectId: "slack-app-clone-548f9",
  storageBucket: "slack-app-clone-548f9.appspot.com",
  messagingSenderId: "192590980086",
  appId: "1:192590980086:web:6446925f90e6c87c0f9dd7",
  measurementId: "G-8YD4YLLVE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const emailProvider = new EmailAuthProvider();
export const db = getFirestore(app);
