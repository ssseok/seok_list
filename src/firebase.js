// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC235jUMITImSQQ59kBqN_8dtHsoRmRDM4",
  authDomain: "seokbobo-2c7fa.firebaseapp.com",
  projectId: "seokbobo-2c7fa",
  storageBucket: "seokbobo-2c7fa.appspot.com",
  messagingSenderId: "445305738350",
  appId: "1:445305738350:web:a1b9ae42cda99e8216027f",
  measurementId: "G-8VFTMCSKWQ",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
