import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import leaderboardReducer from './leaderboard';
import puzzleReducer from './puzzle';
import authReducer from './auth';

export const initialState = {}; //TEMP, will probably get rid of later.

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    leaderboards: leaderboardReducer,
    puzzle: puzzleReducer
});

export default rootReducer;