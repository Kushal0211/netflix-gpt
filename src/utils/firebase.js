// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfGEUeWwGGL93Ul4TvPL0nYTaOdwGH7vk",
  authDomain: "netflixgpt-bee01.firebaseapp.com",
  projectId: "netflixgpt-bee01",
  storageBucket: "netflixgpt-bee01.firebasestorage.app",
  messagingSenderId: "396223126425",
  appId: "1:396223126425:web:0e98149630003373121108",
  measurementId: "G-JVHSM00DYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();