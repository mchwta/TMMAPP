import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyBpUvqRiPEa26RiA0PsK1V1qI_ZqlHGpw0",
  authDomain: "daily-moments-9abb4.firebaseapp.com",
  projectId: "daily-moments-9abb4",
  storageBucket: "daily-moments-9abb4.appspot.com",
  messagingSenderId: "295639442776",
  appId: "1:295639442776:web:402663e5b5aa8bb5f0f12d",
  measurementId: "G-JJTPX4R3C6"
  };

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const store = app.storage();