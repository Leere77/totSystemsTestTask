import React, { useState, useRef } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './User.scss';
import { changeUserStatus, userLogout } from '../../actions/userActions';

const letters = ['😄', '😌', '😓', '🤡', '😴', '🤕', '❤️'];
const navLinks = ['Work', 'Chat', 'My'];

function User({ userName, status, changeUserStatus, userLogout }) {
    const [iconBarState, setIconBarState] = useState(false);
    const refSetIcon = useRef();

    if (!userName)
        return <Redirect to="/login" />

    function listener(event) {
        if (!refSetIcon.current.contains(event.target)) {
            setIconBarState(false);
            document.removeEventListener('click', listener);
        }
    }

    const iconBarToggle = () => {
        if (iconBarState == false) {
            document.addEventListener('click', listener);
            setIconBarState(true);
        } else
            document.removeEventListener('click', listener);
    };

    const icons =
        letters.map(letter =>
            <span
                className="icon"
                key={letter}
                onClick={() => changeUserStatus(letter, userName)}
            >
                {letter}
            </span>
        );

    return (
        <div className="left-сontainer">
            <div className="user">
                <div className="user__name">{userName + status}</div>

                <div className="user__setIcon" onClick={iconBarToggle}>
                    SetIcon {iconBarState ? '-' : '+'}
                </div>
                <div
                    className={`setIcon setIcon--${iconBarState ? 'active' : 'hidden'}`}
                    ref={refSetIcon}
                >
                    {icons}
                </div>

                {
                    navLinks.map(link => (
                        <NavLink
                            to={'/' + link.toLowerCase()}
                            key={link}
                            activeClassName="nav__link--current"
                            className="nav__link">
                            {link}
                        </NavLink>
                    ))
                }
            </div>

            <div className="footer">
                <p className="nav__link" onClick={userLogout}>Logout</p>
                <p>Planktonics</p>
            </div>

        </div>
    );
}

const mapStateToProps = ({ user: { userName, status } }) => ({
    userName,
    status
});

const mapDispatchToProps = dispatch => ({
    changeUserStatus: (status, userName) => dispatch(changeUserStatus({
        userName,
        status
    })),
    userLogout: () => dispatch(userLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(User);