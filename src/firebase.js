import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyDl5UXQE5TZKOsc98-DwOxoYl1oGU6TacE",
  authDomain: "react-netflix-daabc.firebaseapp.com",
  databaseURL: "https://react-netflix-daabc.firebaseio.com",
  projectId: "react-netflix-daabc",
  storageBucket: "react-netflix-daabc.appspot.com",
  messagingSenderId: "677960063920",
  appId: "1:677960063920:web:f9c089e8346d0c0a4e9475",
};

const firebaseApp = firebase.initializeApp(firebaseConfig, {
  attachAuthIsReady: true,
});
const db = firebaseApp.firestore();
const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, timestamp, googleProvider };
