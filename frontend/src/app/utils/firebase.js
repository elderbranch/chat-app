
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNfIHoBMkgC4I7KmYIKfonqLZ0vYBKI9M",
  authDomain: "webchat-db447.firebaseapp.com",
  projectId: "webchat-db447",
  storageBucket: "webchat-db447.firebasestorage.app",
  messagingSenderId: "243513943973",
  appId: "1:243513943973:web:40a47ff2cfcc6242b96a4c",
  measurementId: "G-ZWGRFC7RDR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
