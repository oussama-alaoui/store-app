// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, addDoc, where, orderBy, limit, onSnapshot} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAomZ8HMgg1El9gsjLsb-5rjEoT6HYdPIY",
  authDomain: "store-app-e01aa.firebaseapp.com",
  databaseURL: "https://store-app-e01aa-default-rtdb.firebaseio.com",
  projectId: "store-app-e01aa",
  storageBucket: "store-app-e01aa.appspot.com",
  messagingSenderId: "550438844982",
  appId: "1:550438844982:web:1b0a675fef810887bcb697",
  measurementId: "G-FHR7BDD00C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, query, addDoc, where, orderBy, limit, onSnapshot };