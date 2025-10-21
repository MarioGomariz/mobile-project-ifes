import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-VrkitSy63VdTCQ6Nobbk2s8Wx-gXXOQ",
  authDomain: "my-app-ad6e0.firebaseapp.com",
  projectId: "my-app-ad6e0",
  storageBucket: "my-app-ad6e0.firebasestorage.app",
  messagingSenderId: "485123650455",
  appId: "1:485123650455:web:d92175a7b4ead225a00ad2"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) 
});
const db = getFirestore(app);

export { auth, db };
