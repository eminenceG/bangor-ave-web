import * as constants from "../constants";
import axios from 'axios'

function authSUCCESS(data){
    return {type: constants.AUTH_SUCCESS, payload: data}
}

export function authFAIL(dispatch){
    return dispatch({type:constants.AUTH_FAIL});
}

function errorMsg(msg){
    return {msg, type:constants.ERROR_MSG}
}

export function loadData(dispatch, userinfo){
    console.log('dispatched to loaddata');
    console.log(userinfo);
    return dispatch({type: constants.LOAD_DATA, payload: userinfo});
}

export function updateProfile(dispatch, data){
    console.log(data);
    return axios(constants.HOST + '/user/updateProfile',{
            method:'post',
            data:data,
            withCredentials: true} )
        .then(res=>{
            if(res.status == 200 && res.data.code === 0){
                return dispatch(authSUCCESS(res.data.data));
            } else {
                return dispatch(errorMsg(res.data.msg));
            }
        })

}

export const login = (dispatch, {user, password}) => {
    if(!user||!password){
        return errorMsg('both user name and password are required!');
    }

    return axios(constants.HOST + '/user/login',{
            method:'post',
            data:{user, password},
            withCredentials: true
        })
            .then(res=>{
                if(res.status ==200&&res.data.code===0){
                    return dispatch(authSUCCESS(res.data.data));
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

    return axios(constants.HOST +'/user/register',{
            method:'post',
            data:{user, password, status},
            withCredentials: true
        })
            .then(res=>{
                if(res.status ==200&&res.data.code===0){ // code 0 means login success
                    return dispatch(authSUCCESS({user, password, status}));
                }
                else{
                    return dispatch(errorMsg(res.data.msg));
                    // the error message will be determined by backend.
                }
            });

}