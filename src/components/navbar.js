import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../store/reducers/auth';
import { NavLink } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleClick() {
            dispatch(signOut());
        }
    }
}

const Navbar = ({ auth, handleClick }) => {
    return (
        <div>
            <div>
                <h1>Sudoku Race</h1>
            </div>
            <br />
            <hr />
            <nav>
                {auth.uid ? (
                    <div>
                        <div className='nav-item'>
                            <NavLink to="/" activeClassName="active">Puzzle List</NavLink>
                        </div>
                        <div className="nav-item">
                            <a href="#" onClick={handleClick}>Logout</a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='nav-item'>
                            <NavLink to="/signUp" activeClassName="active">Sign Up</NavLink>
                        </div>
                        <div className='nav-item'>
                            <NavLink to="/login" activeClassName="active">Login</NavLink>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
