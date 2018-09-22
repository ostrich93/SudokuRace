const initialState = {
    soloLeaderboards: [],
    vsLeaderboards: [],
    leaderboard: {}, //a leaderboard is composed of an puzzleid and a list of key value pairs
    newTime: 0
}

const GET_SOLO_LEADERBOARDS = 'GET_SOLO_LEADERBOARDS';
const GET_VS_LEADERBOARDS = 'GET_VS_LEADERBOARDS';
const GET_LEADERBOARDS = 'GET_LEADERBOARDS';
const SUBMIT_NEW_SCORE = 'SUBMIT_NEW_SCORE';
const GOT_SCORE_FROM_SERVER = 'GOT_SCORE_FROM_SERVER';
const GET_LEADERBOARD = 'GET_LEADERBOARD';
// const GET_BEST_TIME = 'GET_BEST_TIME'; make this a thunk?

export const getSoloLeaderboards = () => ({
    type: GET_SOLO_LEADERBOARDS,
    leaderboards
});

export const getVsLeaderboards = () => ({
    type: GET_VS_LEADERBOARDS,
    leaderboards
})

export const getLeaderboard = leaderboard => ({
    type: GET_LEADERBOARD,
    leaderboard
})

export const submitScore = (newScore) => ({
    type: SUBMIT_NEW_SCORE,
    newTime: newScore.time,
    handle: newScore.handle
});

export const getScore = (score) => ({
    type: GOT_SCORE_FROM_SERVER,
    score
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SOLO_LEADERBOARDS:
            return {...state, soloLeaderboards: action.leaderboards}
        case GET_VS_LEADERBOARDS:
            return {...state, vsLeaderboards: action.leaderboards}
        case SUBMIT_NEW_SCORE:
            return {...state, newTime: action.newTime, handle: action.handle }
        case GET_LEADERBOARD:
            return {...state, leaderboard: leaderboard }
        default:
            return state;
    }
}

export default reducer;