import { createStore, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebaseDB from '../firebase';
import firestoreDB from '../firestore';
import { initialState, rootReducer } from './reducers';

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const enhancers = compose(
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {
        userProfile: 'users',
        useFirestoreForProfile: true
    })
)(createStore);

const store = createStore(rootReducer, initialState);

export default store;