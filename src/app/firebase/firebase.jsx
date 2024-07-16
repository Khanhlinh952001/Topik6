// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDSujNmEBNLi_7sqYFEiliuB3XnqVpmByM",
  authDomain: "topik-8922c.firebaseapp.com",
  databaseURL: "https://topik-8922c-default-rtdb.firebaseio.com",
  projectId: "topik-8922c",
  storageBucket: "topik-8922c.appspot.com",
  messagingSenderId: "11625987885",
  appId: "1:11625987885:web:8f19e209ff4238b3451da4",
  measurementId: "G-2LJZ5HE13W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getDatabase(app);
