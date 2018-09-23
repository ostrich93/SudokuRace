import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPuzzle } from '../store/reducers/puzzle';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        selectedPuzzle: state.puzzle.selectedPuzzle
    }
}

// const mapDispatchToProps = dispatch => ({
//         selectPuzzle: puzzle => dispatch(getPuzzle(puzzle))
// });

const AllPuzzles = props => {
    console.log('all puzzles props', props);
    const puzzles = props.puzzles;
    return (
        <div>
            {puzzles && puzzles.map(
                puzzle => {
                    return (
                        <div key={puzzle.id}>
                            <NavLink to={`/puzzle/${puzzle.id}`}><h4>{puzzle.id}</h4></NavLink>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default connect(mapStateToProps)(AllPuzzles);