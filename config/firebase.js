// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfigUpload = {
    apiKey: "AIzaSyAtW2gNxarGgJ31qqV0BOitrogcDZjwukM",
    authDomain: "love-fe-71303.firebaseapp.com",
    databaseURL: "https://love-fe-71303-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "love-fe-71303",
    storageBucket: "love-fe-71303.firebasestorage.app",
    messagingSenderId: "792559040872",
    appId: "1:792559040872:web:8eff1904cfd81160dd3edd"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfigUpload, "fileUpload");
export const storage = getStorage(firebaseApp);
