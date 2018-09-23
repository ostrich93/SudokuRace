import React, { Component } from 'react';
import { withRouter, NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AllPuzzles from './AllPuzzles';
import SinglePuzzle from './SinglePuzzle';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        puzzles: state.firestore.ordered.puzzles,
        auth: state.firebase.auth,
        leaderboards: state.firestore.ordered.soloBoards
    }
};

class Home extends Component {

    render() {
        console.log(this.props);
        const { auth, puzzles, leaderboards } = this.props;
        console.log('puzzles', puzzles);
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <div className="container">
                <div>
                    <AllPuzzles puzzles={puzzles} />
                </div>
            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'puzzles' },
        { collection: 'soloBoards' }
    ])
)(Home);
