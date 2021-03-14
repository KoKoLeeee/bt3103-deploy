import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCAhUjjje1XiZGsf4qaJRzOEiQ3_mHAwQM",
    authDomain: "bt3103-week-6-19dc4.firebaseapp.com",
    projectId: "bt3103-week-6-19dc4",
    storageBucket: "bt3103-week-6-19dc4.appspot.com",
    messagingSenderId: "717965632709",
    appId: "1:717965632709:web:25558560b262a83bc1bcac",
    measurementId: "G-TRVSB4JEMW"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;