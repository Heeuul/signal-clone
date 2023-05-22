// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAshMgCzSQ15da-jB1u4nA_dZazkhXpvNQ",
  authDomain: "signal-clone-3a634.firebaseapp.com",
  projectId: "signal-clone-3a634",
  storageBucket: "signal-clone-3a634.appspot.com",
  messagingSenderId: "1016541408815",
  appId: "1:1016541408815:web:8b0c80a4c8c5ddbe5320da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
