import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.SUDOKU_RACE_FIREBASE_API_KEY,
    authDomain: process.env.SUDOKU_RACE_AUTH_DOMAIN,
    databaseURL: process.env.SUDOKU_RACE_DATABASE_URL,
    projectId: process.env.SUDOKU_RACE_PROJECTID,
    storageBucket: "named-container-183602.appspot.com",
    messagingSenderId: "530607937727"
}

// firebase.initializeApp(firebaseConfig);

export default firebaseConfig;