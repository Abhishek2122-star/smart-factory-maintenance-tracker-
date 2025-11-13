// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzaAO-F4NTJlsnwcq8BMG554ci04TGjAc",
  authDomain: "smart-factory-tracker-832a5.firebaseapp.com",
  projectId: "smart-factory-tracker-832a5",
  storageBucket: "smart-factory-tracker-832a5.firebasestorage.app",
  messagingSenderId: "613584972191",
  appId: "1:613584972191:web:334b777917780e99d0f5aa",
  measurementId: "G-KPRTQZNBVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);