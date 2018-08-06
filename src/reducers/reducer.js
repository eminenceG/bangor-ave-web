// import { combineReducers } from 'redux'
// import { user } from '../redux/user.redux'
import * as constants from "../constants";

// export default combineReducers({user});
import axios from 'axios'
import { getRedirectPath } from '../util'
const initState={
    redirectTo: '',
    isAuth:false,
    msg:'',
    user:'',
    status:''
}


export const userReducer = (state = initState, action) => {

    switch(action.type){
        case constants.REGISTER_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload) ,isAuth:true, ...action.payload};
        case constants.LOGIN_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload) ,isAuth:true, ...action.payload};
        case constants.LOAD_DATA:
            return {...state, ...action.payload};

        case constants.ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        default:
            return state;
    }
}