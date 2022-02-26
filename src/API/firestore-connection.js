import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

initializeApp(firebaseConfig)

export const db = getFirestore();
