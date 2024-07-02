// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDPcEgmK_tEutyNUni-iVtELyLaeMXJX3w",
    authDomain: "nomadhub-94392.firebaseapp.com",
    projectId: "nomadhub-94392",
    storageBucket: "nomadhub-94392.appspot.com",
    messagingSenderId: "65668719830",
    appId: "1:65668719830:web:cf3ab2122a3cbaf3e9d577",
    measurementId: "G-BJ0WX1RVSZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
