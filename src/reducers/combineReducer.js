import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { chatUser } from './chatUserReducer'
import * as constants from "../constants";

export default combineReducers({userReducer, chatUser});
