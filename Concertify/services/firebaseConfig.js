
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBc4Nr6LTJc1JwSafBdSLJRyr4EL_H2cJI",
  authDomain: "concertify-ef51d.firebaseapp.com",
  projectId: "concertify-ef51d",
  storageBucket: "concertify-ef51d.appspot.com",
  messagingSenderId: "788216928993",
  appId: "1:788216928993:web:4cfffb723555225cd035a0",
  measurementId: "G-72JFLKMP19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {app,auth,db};