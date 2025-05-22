// firebase.js (hoặc firebaseConfig.js)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCeWN9pfFS3r62K1LgnhZJa2QbEdhvj-EM",
    authDomain: "love-53d61.firebaseapp.com",
    projectId: "love-53d61",
    storageBucket: "love-53d61.appspot.com",
    messagingSenderId: "74410892715",
    appId: "1:74410892715:web:fec3c3333b4ad2acc906ee",
    measurementId: "G-GQR38QJXKX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };