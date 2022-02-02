// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArsKQ_Ay1TanT15n8S4T4lJ83oKkHfBkI",
  authDomain: "sseok-4830d.firebaseapp.com",
  projectId: "sseok-4830d",
  storageBucket: "sseok-4830d.appspot.com",
  messagingSenderId: "146770204472",
  appId: "1:146770204472:web:337c7290ffb7aa5d6dd3cd",
  measurementId: "G-6K58T1TC6Q",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
