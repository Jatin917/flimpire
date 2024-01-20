/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// eslint-disable-next-line no-unused-vars
const firebaseConfig = {
  apiKey: 'AIzaSyDLJth4tCdwqbXBJp-ngIb3yRPQqzJj5hA',
  authDomain: 'netflix-clone-afb70.firebaseapp.com',
  projectId: 'netflix-clone-afb70',
  storageBucket: 'netflix-clone-afb70.appspot.com',
  messagingSenderId: '105579100062',
  appId: '1:105579100062:web:9540ee7ebb9ee5d0d4488f',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
