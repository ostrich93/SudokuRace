import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Cell from '../data_structs/Cell';
import { getPuzzle, selectCell, selectFill, changeCell } from '../store/reducers/puzzle';
import { getRow, getColumn, getSubgrid, hasViolations, isReadyForSubmission } from '../utils/subgroups';
import SingleCell from './SingleCell';
import fillRanges from '../data_structs/fillRanges';

class SinglePuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            timerRunning: false,
            isSolved: false
        }
        this.buildPuzzle = this.buildPuzzle.bind(this);
        this.getRow = this.getRow.bind(this);
        this.getColumn = this.getColumn.bind(this);
        this.getSubgrid = this.getSubgrid.bind(this);
        this.handleCellSelect = this.handleCellSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitScore = this.submitScore.bind(this);
        this.startTimer = this.startTimer.bind(this);

    }

    async componentDidMount() {
        //start timer
        const clueList = this.props.clueList.clues;
        const puzzle = this.buildPuzzle(clueList);
        const res = await this.props.getPuzzle(puzzle);
        console.log('res', res);
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer() {
        const startTime = Date.now() - this.state.time;
        this.timer = setInterval(() => {
            this.setState({ timerRunning: true, time: Date.now() - startTime })
        })
    }

    getRow(rowNum) {
        return getRow(this.props.currentPuzzle, rowNum);
    }

    getColumn(colNum) {
        return getColumn(this.props.currentPuzzle, colNum);
    }

    getSubgrid(sgNum) {
        return getSubgrid(this.props.currentPuzzle, sgNum);
    }

    handleCellSelect(event) {
        event.preventDefault();
        let cell = event.target.value;
        if (event.target.value === this.props.selectedCell) {
            this.props.selectCell({});
        }
        else
            this.props.selectCell(cell);
    }

    handleSubmit(event) { //used after picking cell and then clicking on a number on the pad.
        event.preventDefault();
        let currentCell = this.props.currentCell;
        if (currentCell && !currentCell.isClue) {
            let nVal = event.target.value;
            let nCell = new Cell(nVal, currentCell.rowNum, currentCell.colNum, currentCell.sgNum, false)
            this.props.changeCell(nCell);
        }
    }

    submitScore(event) {
        event.preventDefault();
        const inds = [0,1,2,3,4,5,6,7,8];
        const rows = inds.map(i => this.getRow(i));
        const cols = inds.map(i => this.getColumn(i));
        const sgs = inds.map(i => getSubgrid(i));
        let allgroups = [rows].concat(cols,sgs);
        if (allgroups.every(group => isReadyForSubmission(group))){
            this.setState({
                isSolved: true,
                timerRunning: false
            });
            console.log('submission success');
        }
        else
            console.log('not ready for submission');
    }

    isValid(cell) {
        const targetRow = this.getRow(cell.rowNum);
        const targetCol = this.getColumn(cell.colNum);
        const targetSG = this.getSubgrid(cell.sgNum);
        return [targetRow, targetCol, targetSG].every(group => !hasViolations(group)); //return true if all hasViolations === false
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
                let clueCell = new Cell(possClue.fillValue, rn, cn, sgval, i, true);
                cellArr.push(clueCell);
            }
            else {
                let newCell = new Cell(0, rn, cn, sgval, i);
                cellArr.push(newCell);
            }
        }
        return cellArr;
    }

    render() {
        let cells = this.props.currentPuzzle;
        console.log('cells', this.props);
        return (
            <div>
                <div className="puzzleContainer"> {/* container of grid, has display: flex **/}
                    {cells.map(cell => <SingleCell key={cell.index} isValid={this.isValid(cell)} cell={cell} handleCellSelect={this.handleCellSelect}/>)}
                </div>
                <div className="buttonContainer"> {/* used to hold the buttons for changing fill values **/}
                    <button onClick={this.handleSubmit} value={1}>1</button>
                    <button onClick={this.handleSubmit} value={2}>2</button>
                    <button onClick={this.handleSubmit} value={3}>3</button>
                    <button onClick={this.handleSubmit} value={4}>4</button>
                    <button onClick={this.handleSubmit} value={5}>5</button>
                    <button onClick={this.handleSubmit} value={6}>6</button>
                    <button onClick={this.handleSubmit} value={7}>7</button>
                    <button onClick={this.handleSubmit} value={8}>8</button>
                    <button onClick={this.handleSubmit} value={9}>9</button>
                    <button onClick={this.handleSubmit} value={0}>Erase</button>
                </div>
                <div>
                    {/* something that holds the timer */}
                    <button onClick={this.submitScore}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const pid = ownProps.match.params.id;
    const puzzles = state.firestore.data.puzzles;
    const puzzle = puzzles ? puzzles[pid] : null;
    // const handle = state.leaderboards.handle;
    return {
        clueList: puzzle,
        auth: state.firebase.auth,
        // handle: handle
    }
};

const mapDispatchToProps = dispatch => ({
    getPuzzle: puzzle => dispatch(getPuzzle(puzzle)),
    selectCell: cell => dispatch(selectCell(cell)),
    selectFill: fill => dispatch(selectFill(fill)),
    changeCell: cell => dispatch(changeCell(cell))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.pid) return [];
        return [
            { collection: 'puzzles' },
            { collection: 'soloBoards'}
        ]
    })
)(SinglePuzzle);