// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrG3zVXuEgYx0UXoCL2M2G2ZR3TsU77lg",
  authDomain: "internassignment1.firebaseapp.com",
  projectId: "internassignment1",
  storageBucket: "internassignment1.appspot.com",
  messagingSenderId: "816922915249",
  appId: "1:816922915249:web:97868609f831e1bd37cd90",
  measurementId: "G-S6Y84PSEFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();