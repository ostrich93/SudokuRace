import { createStore, compose, applyMiddleware } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebaseConfig from '../firebase';
import rootReducer, { initialState } from './reducers';
import thunk from 'redux-thunk';

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

// const middleware = compose(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));

const enhancers = [
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(firebase, {
        userProfile: 'users',
        useFirestoreForProfile: true
    }),
    reduxFirestore(firebase)
];

const reduxDevToolsExtension = window.devToolsExtension;
if (
    process.env.NODE_ENV === "development" && 
    typeof reduxDevToolsExtension === "function"
    ){
        enhancers.push(reduxDevToolsExtension());
    }

const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
