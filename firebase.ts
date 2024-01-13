// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfGo-GjyLa0Z-IMesSX7ADgGF3cVYgtW4",
    authDomain: "netflix-clone-47aeb.firebaseapp.com",
    projectId: "netflix-clone-47aeb",
    storageBucket: "netflix-clone-47aeb.appspot.com",
    messagingSenderId: "695177162637",
    appId: "1:695177162637:web:f22ee544bb47b31b99d7c4"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }