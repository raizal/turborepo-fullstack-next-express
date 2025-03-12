import dotenv from 'dotenv';
import {initializeApp} from 'firebase/app';
import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    sendPasswordResetEmail,
    connectAuthEmulator,
  } from "firebase/auth" ;
  

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
const app = admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = getFirestore(app);
const auth = getAuth();

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`);
}

export {
    auth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    sendPasswordResetEmail,
    admin,
    db,
};
