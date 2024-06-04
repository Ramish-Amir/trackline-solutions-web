// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-eRO_ICwhHIr0XZzhyQPrcFrdTMUFuWg",
  authDomain: "trackline-sols.firebaseapp.com",
  projectId: "trackline-sols",
  storageBucket: "trackline-sols.appspot.com",
  messagingSenderId: "416352605191",
  appId: "1:416352605191:web:d25e861739ad7a0b0b86a2",
  measurementId: "G-GJDWNC2HEY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
