import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
const { getStorage, connectStorageEmulator } = require("firebase/storage");
import { getApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBougjFNRErhXCqkgWSwiqC8JDgYJkf0nc",
    authDomain: "shop-e9c61.firebaseapp.com",
    projectId: "shop-e9c61",
    storageBucket: "shop-e9c61.appspot.com",
    messagingSenderId: "771470416116",
    appId: "1:771470416116:web:676c8663d58a0d3c4be6a1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const functions = getFunctions(getApp());
const storage = getStorage();
if (location.hostname === "localhost") {
    // Point to the Storage emulator running on localhost.
    console.log("Emulator mode");
    connectStorageEmulator(storage, "localhost", 9199);
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFunctionsEmulator(functions, "localhost", 5001);
}


// Initialize Firebase
export { db, auth, storage };