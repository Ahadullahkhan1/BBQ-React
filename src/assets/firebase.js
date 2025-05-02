
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTLON8ElrA03nqXwkMx-ag4--M35UFNSo",
  authDomain: "bbq-people.firebaseapp.com",
  projectId: "bbq-people",
  storageBucket: "bbq-people.firebasestorage.app",
  messagingSenderId: "503036713213",
  appId: "1:503036713213:web:d911cd76ea60b210a00694",
  measurementId: "G-WVH2CD8Z5H"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db }