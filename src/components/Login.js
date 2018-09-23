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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
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
        if (!auth) return <Redirect to="/" />
        return (
            <div className="container">
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" required value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" required value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);