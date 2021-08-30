// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc  } from 'firebase/firestore/lite';
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBY63Ag3puNhL7C_Y6mZPiz5Txuk27sMrg",
    authDomain: "drive-clone-6d3c6.firebaseapp.com",
    databaseURL: "https://drive-clone-6d3c6-default-rtdb.firebaseio.com",
    projectId: "drive-clone-6d3c6",
    storageBucket: "drive-clone-6d3c6.appspot.com",
    messagingSenderId: "324365176304",
    appId: "1:324365176304:web:edb9b054d13469e8d9a135",
    measurementId: "G-SPE505XSKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const storage = getStorage();


const newCityRef = doc(collection(db, "cities"));

export const database  = {
    formatDoc: (doc:any) => {
        return {id: doc.id, ...doc.data()};
    },
    // docRef: (document:any) => addDoc(collection(db, "folders"), {id: document.id, ...document.data()}),
    docRef: (document:any) => setDoc(newCityRef, document.data()),
    folders: collection(db, "folders"),
    files: collection(db ,"files"),
};


export {auth, provider, analytics};
