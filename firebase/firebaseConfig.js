// firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection, query, orderBy, limit, startAfter, getDocs ,where,getCountFromServer,getDoc,doc} from "firebase/firestore";

// Replace with your Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyBltlQP8OjABHSZFL93JGWRVhGwRVle0-4",
//     authDomain: "campus-ab9d7.firebaseapp.com",
//     projectId: "campus-ab9d7",
//     storageBucket: "campus-ab9d7.firebasestorage.app",
//     messagingSenderId: "839925913336",
//     appId: "1:839925913336:web:58b5b851aa9e595b9c4d0d"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCBnNclmPdKY-b03Tz5-qe1MmGH9i9EXpw",
  authDomain: "campus-7cfcb.firebaseapp.com",
  projectId: "campus-7cfcb",
  storageBucket: "campus-7cfcb.firebasestorage.app",
  messagingSenderId: "772039666767",
  appId: "1:772039666767:web:8979607274884dc7bc4e3a"
};

// Initialize Firebase (prevents multiple instances)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);     // Firestore DB
const auth = getAuth(app);        // Authentication
const storage = getStorage(app);  // Storage

export {app, db,storage, collection, query, orderBy, limit, startAfter, getDocs,where,getCountFromServer,getDoc,doc };
