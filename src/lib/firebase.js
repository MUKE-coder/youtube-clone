import "firebase/compat/auth";

import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVHYAY4rMj-szOgffMS-_0ebZl4y7BBYw",
  authDomain: "utube-clone-5cea2.firebaseapp.com",
  projectId: "utube-clone-5cea2",
  storageBucket: "utube-clone-5cea2.appspot.com",
  messagingSenderId: "39447408111",
  appId: "1:39447408111:web:24667370b1e2ca09b59a1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();
export { db, auth, provider, storage };
