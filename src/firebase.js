import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAbSxjws9a25W9lUyD-LfeZciBULHfaMJM",
    authDomain: "bt3103-week-6-cbfd3.firebaseapp.com",
    projectId: "bt3103-week-6-cbfd3",
    storageBucket: "bt3103-week-6-cbfd3.appspot.com",
    messagingSenderId: "928782487847",
    appId: "1:928782487847:web:cd0c63d731a0d099999902",
    measurementId: "G-FYK5Z2QXSZ"
  };


firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;