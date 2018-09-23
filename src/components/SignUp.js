import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../store/reducers/auth';

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: newuser => dispatch(signUp(newuser))
    }
}

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            displayName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { auth, user } = this.props;
        if (!auth) return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h3 className="text-darken-3">Sign Up</h3>
                    <div className="input-field">
                        <label htmlFor="displayName">handle</label>
                        <input type="text" name="displayName" required value={this.state.displayName} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" required value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" required value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);