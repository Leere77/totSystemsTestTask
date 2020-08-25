import {
    GET_USER_DATA,
    CHANGE_USER_STATUS,
    USER_LOGOUT
} from '../actions/actions'

const initialState = {
    userName: localStorage.getItem('userName'),
    status: localStorage.getItem('status'),
    error: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                userName: action.userName,
                status: action.status,
                error: action.error
            };
        case CHANGE_USER_STATUS:
            return { ...state, status: action.status };
        case USER_LOGOUT:
            return { ...state, userName: null, status: null };
    
        default:
            return state;
    }
}