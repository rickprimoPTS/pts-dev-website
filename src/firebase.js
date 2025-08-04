// src/firebase.js

// Importa as funções que precisamos da biblioteca que instalamos
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// A sua configuração do Firebase (que você já tinha)
const firebaseConfig = {
    apiKey: "AIzaSyCsfQXXc37njdoE87jvBV5sOtLbTEj1tSM",
    authDomain: "pts-dev-br.firebaseapp.com",
    projectId: "pts-dev-br",
    storageBucket: "pts-dev-br.firebasestorage.app",
    messagingSenderId: "415274624036",
    appId: "1:415274624036:web:cd02b8bcb9cb96a767e4b1",
    measurementId: "G-7F8DLRD94X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);