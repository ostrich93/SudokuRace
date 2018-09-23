import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SinglePuzzle from './components/SinglePuzzle';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/puzzle/:id' component={SinglePuzzle} />
            <Route path='/login' component={Login} />
            <Route path='/signUp' component={SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
