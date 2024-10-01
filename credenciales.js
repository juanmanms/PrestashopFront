// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCsrkN6qPeAIMoPHp90irZMNUrkuOnhgBc",
    authDomain: "botigas-7c71f.firebaseapp.com",
    projectId: "botigas-7c71f",
    storageBucket: "botigas-7c71f.appspot.com",
    messagingSenderId: "433240989297",
    appId: "1:433240989297:web:425b08b85d13b51d1685d0"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;