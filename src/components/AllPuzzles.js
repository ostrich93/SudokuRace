import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPuzzle } from '../store/reducers/puzzle';
import { NavLink } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        puzzles: state.firestore.ordered.puzzles,
        selectedPuzzle: state.puzzle.selectedPuzzle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectPuzzle: puzzle => dispatch(getPuzzle(puzzle))
    };
};

const AllPuzzles = props => {
    return (
        <div>
            {props.puzzles.map(
                puzzle => {
                    return (
                        <div key={puzzle.id}>
                            <NavLink to={`/puzzles/${puzzle.id}`}><h4>{puzzle.id}</h4></NavLink>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps,
        firestoreConnect((props) => {
            return [
                {
                    collection: 'puzzles'
                }
            ]
        }))
)(AllPuzzles);