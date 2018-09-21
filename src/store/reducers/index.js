import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import leaderboardReducer from './leaderboard';
import puzzleReducer from './puzzle';

export const initialState = {}; //TEMP, will probably get rid of later.

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    leaderboards: leaderboardReducer,
    puzzle: puzzleReducer
});