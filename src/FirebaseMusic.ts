// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "music-ts-78b70.firebaseapp.com",
  projectId: "music-ts-78b70",
  storageBucket: "music-ts-78b70.appspot.com",
  messagingSenderId: "1024484832025",
  appId: "1:1024484832025:web:58785cc9ff85bbd7ad4b88",
  measurementId: "G-KB1PH2XKNW"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const authFirebase = getAuth(firebaseApp)
export const dbApp =getFirestore(firebaseApp)