import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/reducers/auth';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: credentials => dispatch(login(credentials))
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const submission = {email, password};
        await this.props.login(submission);
    }

    render() {
        const { auth, user } = this.props;
        if (Object.keys(user).length || auth.uid) return <Redirect to="/" />
        return (
            <div className="container">
                <h3>Login</h3>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" required value={this.state.email} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" required value={this.state.password} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);