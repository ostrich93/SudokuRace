import { Cell, fillRanges, groupType } from '../../data_structs';
import { union, intersection, difference } from '../../utils/set-operators';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';
import firestoreDB from '../../firestore';

let initialState = {
    currentPuzzle = []
}

//ACTION TYPES
const GET_PUZZLE = 'GET_PUZZLE';
const CHANGE_CELL_VALUE = 'CHANGE_CELL_VALUE';

//ACTION CREATORS

export const getPuzzle = (puzzle) => ({
    type: GET_PUZZLE,
    puzzle
});

export const changeCell = (cell) => ({ //puzzle is puzzle object with update cell
    type: CHANGE_CELL_VALUE,
    cell
});

//REDUCER
function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_PUZZZLE:
            return { ...state, currentPuzzle: action.puzzle }
        case CHANGE_CELL_VALUE:
            const updatedBoard = state.currentPuzzle.map(c => c.equals(action.cell) ? c : action.cell);
            return { ...state, currentPuzzle: updatedBoard }
        default:
            return state;
    }
}

export default reducer;