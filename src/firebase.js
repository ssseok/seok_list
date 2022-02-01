// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3PZPLLJJgi3sPaV2-M7DGiNzfEZXJfLw",
  authDomain: "seok-react-basic.firebaseapp.com",
  projectId: "seok-react-basic",
  storageBucket: "seok-react-basic.appspot.com",
  messagingSenderId: "714526875104",
  appId: "1:714526875104:web:93eb26b8a215e15521df85",
  measurementId: "G-PRT9YQDGFW",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
