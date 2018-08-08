import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import * as constants from "../constants";

export default combineReducers({userReducer});
