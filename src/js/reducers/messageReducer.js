import {
    GET_MESSAGES,
    POST_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE
} from '../actions/actions';

const initialState = {
    messages:[],
    error: null
};

export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
                error: action.error
            };
        case POST_MESSAGE:
            return {
                ...state,
                messages: [action.message,...state.messages],
                error: action.error
            };
        case UPDATE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(message =>
                    message._id == action._id ? 
                        { ...message, text: action.text } : 
                        message),
                error: action.error
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message =>
                    message._id != action._id),
                error: action.error
            };
        default:
            return state;
    }
}