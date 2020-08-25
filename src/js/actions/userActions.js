import {
    GET_USER_DATA,
    CHANGE_USER_STATUS,
    USER_LOGOUT
} from './actions';

const api_url = process.env.API_URL;

const requestOptions = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
}

export const getUserData = ({ userName, password }) =>
    async dispatch => {
        try {
            const request = {
                ...requestOptions,
                body: JSON.stringify({ userName, password }) 
            };
            const user = await fetch(api_url + '/users/login', request)
                .then(res => res.json());
            
            if (!user.error) {
                localStorage.setItem('userName', user.userName);
                localStorage.setItem('status', user.status);
            }

            dispatch({
                type: GET_USER_DATA,
                ...user
            });
        } catch (error) {
            dispatch({
                type: GET_USER_DATA,
                error: "Connection error"
            });
        }
    };

export const changeUserStatus = ({ userName, status }) =>
    async dispatch => {
        try {
            const request = { 
                ...requestOptions,
                method: 'PUT',
                body: JSON.stringify({ userName, status }) };

            await fetch(api_url + '/users', request)
                .then(res => res.json());

            localStorage.setItem('status', status),
            dispatch({
                type: CHANGE_USER_STATUS,
                status
            });
        } catch (error) {
            dispatch({
                type: CHANGE_USER_STATUS,
                error: "Connection error"
            });
        }
    };

export const userLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('status');

    return {
        type: USER_LOGOUT
    }
};