import { combineReducers } from 'redux';
import message from './messageReducer';
import user from './userReducer';

export default combineReducers({ message, user });