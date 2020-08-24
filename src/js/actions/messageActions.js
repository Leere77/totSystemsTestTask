import {
    GET_MESSAGES,
    POST_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE
} from './actions';

const api_url = process.env.API_URL;

const requestOptions = {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
}

export const getMessagesData = ({ type, userName }) =>
    async dispatch => {
        try {
            const messages = await fetch(api_url + '/messages?type=' + 
                type + '&userName=' + userName,
                { ...requestOptions, method: 'GET' })
                .then(res => res.json());;
    
            dispatch({
                type: GET_MESSAGES,
                messages
            });
        } catch (error) {
            dispatch({
                type: GET_MESSAGES,
                error: "Connection error",
                messages: []
            });
        }
    };

export const postMessage = ({ userName, type, text }) =>
    async dispatch => {
        try {
            const request = {
                ...requestOptions,
                body: JSON.stringify({ userName, type, text })
            };

            const message = await fetch(api_url + '/messages', request)
                .then(res => res.json());

            dispatch({
                type: POST_MESSAGE,
                message
            });
        } catch (error) {
            dispatch({
                type: POST_MESSAGE,
                error: "Connection error"
            });
        }
    };

export const updateMessage = ({ _id, text, userName }) =>
    async dispatch => {
        try {
            const request = {
                ...requestOptions,
                method: 'PUT',
                body: JSON.stringify({ _id, text, userName })
            };
            await fetch(api_url + '/messages', request)
                .then(res => res.json());

            dispatch({
                type: UPDATE_MESSAGE,
                _id,
                text
            });
        } catch (error) {
            dispatch({
                type: UPDATE_MESSAGE,
                error: "Connection error"
            });
        }
    };

export const deleteMessage = ({ _id }) =>
    async dispatch => {
        try {
            const request = {
                ...requestOptions,
                method: 'DELETE',
                body: JSON.stringify({ _id })
            };
            await fetch(api_url + '/messages', request)
                .then(res => res.json());
            dispatch({
                type: DELETE_MESSAGE,
                _id
            });
        } catch (error) {
            dispatch({
                type: DELETE_MESSAGE,
                error: "Connection error"
            });
        }
    };