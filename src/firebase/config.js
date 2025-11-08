// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase 설정
// TODO: Firebase Console에서 본인의 설정으로 교체하세요
// https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "AIzaSyBFC9sSzBGJo6AEkWhPggzYhzQi_iSHs6c",
  authDomain: "uwh-world.firebaseapp.com",
  projectId: "uwh-world",
  storageBucket: "uwh-world.firebasestorage.app",
  messagingSenderId: "955371022367",
  appId: "1:955371022367:web:a8b396021de5c245900d2a",
  measurementId: "G-Q7QN2SMK5E"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 내보내기
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
