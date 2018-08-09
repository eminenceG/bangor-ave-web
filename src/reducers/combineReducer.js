import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import {chatReducer} from '../redux/chat.redux'
import { chatUser } from './chatUserReducer'

export default combineReducers({userReducer, chatReducer, chatUser});
