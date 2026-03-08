// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjF91vTNjjs2L08vUp33HTyeJlmASEJzU",
  authDomain: "virtual-diary-af96c.firebaseapp.com",
  projectId: "virtual-diary-af96c",
  storageBucket: "virtual-diary-af96c.firebasestorage.app",
  messagingSenderId: "33187791256",
  appId: "1:33187791256:web:e2be55c66be93283c22bed"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);


