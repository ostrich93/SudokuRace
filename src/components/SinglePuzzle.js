import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Cell } from '../data_structs/Cell';
import { getRow, getColumn, getSubgrid, hasViolations } from '../utils/subgroups';

export default class SinglePuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: [],
            clues: [],
            isSolved: false
        }
        this.buildPuzzle = this.buildPuzzle.bind(this);
    }

    componentDidMount() {
        const clueList = this.props.clueList.clues;
        const puzzle = this.buildPuzzle(clueList);
        this.setState({
            clues: clueList,
            puzzle: puzzle
        });
    }

    buildPuzzle(clues) {
        let cellArr = [];
        let rn = 0;
        let cn = 0;
        let sgval = 0;
        for (let i = 0; i < 81; i++) {
            rn = i/9;
            cn = i%9;
            if (rn < 3) {
                if (cn < 3)
                    sgval = 1;
                else if (cn >= 3 && cn < 6)
                    sgval = 2;
                else
                    sgval = 3;
            }
            else if (rn >= 3 && rn < 6) {
                if (cn < 3)
                    sgval = 4;
                else if (cn >= 3 && cn < 6)
                    sgval = 5;
                else
                    sgval = 6;
            }
            else {
                if (cn < 3)
                    sgval = 7;
                else if (cn >= 3 && cn < 6)
                    sgval = 8;
                else
                    sgval = 9;
            }
            let possClue = clues.find(clue => clue.rowNum === rn && clue.colNum === cn && clue.sgNum === sgval);
            if (possClue) {
                let clueCell = new Cell(possClue.fillValue, rn, cn, sgval, true);
                cellArr.push(clueCell);
            }
            else {
                let newCell = new Cell(0, rn, cn, sgval);
                cellArr.push(newCell);
            }
        }
        return cellArr;
    }

    render() {

    }
}

const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        clueList: state.firestore.ordered.puzzles ? state.firestore.ordered.puzzles && state.firestore.ordered.puzzles[props.pid] : {},
        currentPuzzle: state.puzzle.currentPuzzle
    }
};

const mapDispatchToProps = dispatch => ({
    getPuzzle: dispatch(get)
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.pid) return [];
        return [
            { collection: 'puzzles', doc: props.pid }
        ]
    })
)(SinglePuzzle);