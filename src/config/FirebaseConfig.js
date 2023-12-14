import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCooaYVHzVI6Tb9WEOt-L76eTjGkkr8hvI",
  authDomain: "todolist-58c97.firebaseapp.com",
  projectId: "todolist-58c97",
  storageBucket: "todolist-58c97.appspot.com",
  messagingSenderId: "693579101960",
  appId: "1:693579101960:web:f4253799d2173d72625ebd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
