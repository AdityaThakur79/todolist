import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAOzzGN9MfZUMFl1Xao4ZSogG5goVRAWDU",
  authDomain: "quadb-todo-app.firebaseapp.com",
  projectId: "quadb-todo-app",
  storageBucket: "quadb-todo-app.appspot.com",
  messagingSenderId: "990523898752",
  appId: "1:990523898752:web:c16d0a856e5c39023b1f65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
