import * as constants from "../constants";
import axios from 'axios'

function registerSUCCESS(data){
    return {type: constants.REGISTER_SUCCESS, payload: data}
}

function loginSUCCESS(data){
    return {type: constants.LOGIN_SUCCESS, payload: data}
}

function errorMsg(msg){
    return {msg, type:constants.ERROR_MSG}
}

export function loadData(userinfo){
    return {type: constants.LOAD_DATA, payload: userinfo}
}

export const login = (dispatch, {user, password}) => {
    if(!user||!password){
        return errorMsg('both user name and password are required!');
    }

    return axios.post(constants.HOST + '/user/login',{user, password})
            .then(res=>{
                if(res.status ==200&&res.data.code===0){
                    return dispatch(loginSUCCESS(res.data.data));
                }
                else{
                    return dispatch(errorMsg(res.data.msg));
                    // the error message will be determined by backend.
                }
            });
}


export const register = (dispatch,{user, password, confirmedPassword, status}) => {
    if(!user||!password||!status){
        return errorMsg('username and password must not be empty!');
    }
    if(password!== confirmedPassword){
        return errorMsg('password and confirmed password must be the same!');
    }

    return axios.post(constants.HOST +'/user/register',{user, password, status})
            .then(res=>{
                if(res.status ==200&&res.data.code===0){ // code 0 means login success
                    return dispatch(registerSUCCESS({user, password, status}));
                }
                else{
                    return dispatch(errorMsg(res.data.msg));
                    // the error message will be determined by backend.
                }
            });

}