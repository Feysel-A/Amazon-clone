// Import the functions you need from the SDKs you need
// Importing Firebase modules using v9 syntax
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVYGSMjMAxShKeBxRwx_UGibZBayKKh1g",
  authDomain: "clone-77186.firebaseapp.com",
  projectId: "clone-77186",
  storageBucket: "clone-77186.appspot.com",
  messagingSenderId: "777635363714",
  appId: "1:777635363714:web:181121d2b2014df246ad9b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
