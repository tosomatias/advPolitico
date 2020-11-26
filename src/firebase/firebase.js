import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';




const firebaseConfig = {
    apiKey: "AIzaSyB2tfsSFpbNRf29EXnMCYw9bmukEoA5uCg",
    authDomain: "advaplicacionweb.firebaseapp.com",
    databaseURL: "https://advaplicacionweb.firebaseio.com",
    projectId: "advaplicacionweb",
    storageBucket: "advaplicacionweb.appspot.com",
    messagingSenderId: "961758093820",
    appId: "1:961758093820:web:60f274d376a5c6df5b9279"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {db,auth};