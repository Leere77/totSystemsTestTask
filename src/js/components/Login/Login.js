import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import { getUserData } from '../../actions/userActions';
import { Redirect } from 'react-router-dom';

function Login({ error, getUserData, loggedIn }) {
    if (loggedIn) 
        return <Redirect to="/" />

    const [userName, setUserName] = useState('user1');
    const [password, setPassword] = useState('pass1');

    function submit(e) {
        e.preventDefault();
        getUserData({ userName, password });
    }

    return (
    <div className="login-container">
        <div className="login-caption">Sign in</div>
        {error && <div className="login-caption">{error}</div>}
        <form action="" className="login-form" onSubmit={submit}>
            <label htmlFor="usernameInput" className="login-form__label">Login</label>
            <input
                type="text"
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
                name="usernameInput"
                className="login-form__input"
                placeholder="Login"
            />

            <label htmlFor="passwordInput" className="login-form__label">Password</label>
            <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="passwordInput"
                className="login-form__input"
                placeholder="Pass"
            />
            
            <button className="login-form__button">Sign in</button>
        </form>
    </div>);
}

const mapStateToProps = ({ user: { error, userName } }) => ({ 
    error,
    loggedIn: userName ? true : false 
});

const mapDispatchToProps = dispatch => ({
    getUserData: userData => dispatch(getUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);