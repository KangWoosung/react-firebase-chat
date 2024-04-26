/*   2024-04-26 00:40:16

Firebase Project : ReactChat
1. Firebase 에서 Create new WebApp Project.
2. Firebase SDK Code : copy and paste.
3. Store the apiKey to the .env.local file.

Firebase Authentication Setup
4. SetUp Firebase Authentication and select "Native Provider: Auth with Email and Password" for this case

Firebase Firestore Setup
5. Firebase Console -> Build -> Firestore Database -> Create database
   for the test purpose, select "Test Mode" for now and change it afterwards.
6. Database Creation... is done and console.is ready.

Firebase Storage Setup
7. Firebase Console -> Build -> Storage -> Create Storage
   for the test purpose, select "Test Mode" for now and change it afterwards.


0. Edit SDK file:
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "lamadev-chat-8c463.firebaseapp.com",
  projectId: "lamadev-chat-8c463",
  storageBucket: "lamadev-chat-8c463.appspot.com",
  messagingSenderId: "43669464888",
  appId: "1:43669464888:web:9443387041db79123a03cd",
  measurementId: "G-9WW9N1RRY4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
