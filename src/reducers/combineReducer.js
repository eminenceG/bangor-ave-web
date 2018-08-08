import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import {chatReducer} from '../redux/chat.redux'
import * as constants from "../constants";

export default combineReducers({userReducer, chatReducer});
