// import { combineReducers } from 'redux'
// import { user } from '../redux/user.redux'
import * as constants from "../constants";

// export default combineReducers({user});
import { getRedirectPath } from '../util'
const initState={
    redirectTo: '',
    msg:'',
    user:'',
    status:'',
    avatar:null,
    title: '',
    desc: '',
    posDesc:'',
    company:'',
    money:''
}


export const userReducer = (state = initState, action) => {
    let newState;
    switch(action.type){
        case constants.AUTH_SUCCESS:
            // console.log(state);
            newState = Object.assign({}, {...state, msg:'', redirectTo:getRedirectPath(action.payload) , ...action.payload});
            return newState;
        case constants.AUTH_FAIL:
            // console.log('auth fail');
            // console.log(state);
            newState = Object.assign({},{...initState});
            return newState;
        case constants.LOAD_DATA:
            // console.log(state);
            // console.log('loading data...');
            // console.log({...state, ...action.payload});
            newState = Object.assign({},{...state, ...action.payload});
            return newState;

        case constants.ERROR_MSG:
            // console.log(state);
            newState = Object.assign({},{...state, isAuth:false, msg:action.msg});
            return newState;
        default:
            // console.log(state);
            return state;
    }
}