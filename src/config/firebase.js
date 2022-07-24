import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyANVbP7SPMV0ci7reoJfDFAbDYfaEbb6M4',
  authDomain: 'the-dojo-ce086.firebaseapp.com',
  projectId: 'the-dojo-ce086',
  storageBucket: 'the-dojo-ce086.appspot.com',
  messagingSenderId: '260642303829',
  appId: '1:260642303829:web:e0fc75287431951f9809dc',
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage };
