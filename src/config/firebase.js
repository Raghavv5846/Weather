
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "internassignment1.firebaseapp.com",
  projectId: "internassignment1",
  storageBucket: "internassignment1.appspot.com",
  messagingSenderId: "816922915249",
  appId: "1:816922915249:web:97868609f831e1bd37cd90",
  measurementId: "G-S6Y84PSEFE"
};

const app = initializeApp(firebaseConfig)
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();