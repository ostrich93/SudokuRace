const initialState = {
    user: {}
}

//ACTION TYPES
const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
const REMOVE_LOGGED_IN_USER = 'REMOVE_LOGGED_OUT_USER';

//ACTION CREATORS
export const setLoggedInUser = user => ({
    type: SET_LOGGED_IN_USER,
    user
});

export const removeLoggedInUser = () => ({
    type: REMOVE_LOGGED_IN_USER
});

//REDUCERS
function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN_USER:
            return action.user;
        case REMOVE_LOGGED_IN_USER:
            return {};
        default:
            return state;
    }
}

//THUNKS
export const login = (credentials) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            console.log('response.user', response.user);
            dispatch(setLoggedInUser(response.user));
        } catch(err) {
            console.log(err.stack);
        }
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch(removeLoggedInUser())
        });
    }
}

export const signUp = (newUser) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            await firestore.collection('users').doc(res.user.uid).set({
                displayName: newUser.displayName
            });
            dispatch(setLoggedInUser(res.user))
            console.log('res.user', res.user)
        } catch (err) {
            throw err;
        }
    }
}

export default reducer;