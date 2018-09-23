let initialState = {
    currentPuzzle : [],
    selectedNumber : 0,
    selectedCell : {}
}

//ACTION TYPES
const GET_PUZZLE = 'GET_PUZZLE';
const CHANGE_CELL_VALUE = 'CHANGE_CELL_VALUE';
const SELECT_CELL = 'SELECT_CELL';
const SELECT_FILL = 'SELECT_FILL';

//ACTION CREATORS

export const getPuzzle = (puzzle) => ({
    type: GET_PUZZLE,
    puzzle
});

export const changeCell = (cell) => ({ //puzzle is puzzle object with update cell
    type: CHANGE_CELL_VALUE,
    cell
});

export const selectCell = (cell) => ({
    type: SELECT_CELL,
    cell
});

export const selectFill = (fillValue) => ({
    type: SELECT_FILL,
    fillValue
})

//REDUCER
function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_PUZZLE:
            return { ...state, currentPuzzle: action.puzzle }
        case CHANGE_CELL_VALUE:
            const updatedBoard = state.currentPuzzle.map(c => c.equals(action.cell) ? c : action.cell);
            return { ...state, currentPuzzle: updatedBoard }
        case SELECT_CELL:
            return { ...state, selectedCell: action.cell }
        case SELECT_FILL:
            return { ...state, selectedNumber: action.fillValue }
        default:
            return state;
    }
}

export default reducer;