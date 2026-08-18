import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxFirWL5EH17R4HozWZEUhKhob0MVc0jQ",
  authDomain: "medicare-hospital-8257a.firebaseapp.com",
  projectId: "medicare-hospital-8257a",
  storageBucket: "medicare-hospital-8257a.firebasestorage.app",
  messagingSenderId: "974922477108",
  appId: "1:974922477108:web:e88a5c5c1c30dfb83ae461"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();