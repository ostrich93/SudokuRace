import firebaseDB from './firebase';

const firestoreDB = firebaseDB.firestore();
firestoreDB.settings({
    timestampsInSnapshots: true
});

export default firestoreDB;