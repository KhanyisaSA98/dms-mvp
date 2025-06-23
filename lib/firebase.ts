import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBd-CJStYXSfi2ew0BwW1_ReAPN4sFuLk8",
  authDomain: "dms-mvp-amathole.firebaseapp.com",
  projectId: "dms-mvp-amathole",
  storageBucket: "dms-mvp-amathole.firebasestorage.app",
  messagingSenderId: "280358793671",
  appId: "1:280358793671:web:a1603ff5086c690227e9e2",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Storage
export const storage = getStorage(app)

export default app
