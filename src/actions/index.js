import * as constants from "../constants";
import axios from 'axios'

function authSUCCESS(obj){
    const {password, ...data} = obj; // exclude password when auth success. So when register success, password will not appear in redux.
    return {type: constants.AUTH_SUCCESS, payload: data}
}

export function authFAIL(dispatch){
    return dispatch({type:constants.AUTH_FAIL});
}

function errorMsg(msg){
    return {msg, type:constants.ERROR_MSG}
}

export function loadData(dispatch, userinfo){
    // console.log('dispatched to load data');
    // console.log(userinfo);
    return dispatch({type: constants.LOAD_DATA, payload: userinfo});
}


export function logoutSubmit(dispatch) {
  return dispatch({type: constants.LOGOUT});
}

export function updateProfile(dispatch, data){
    console.log(data);
    return axios(constants.HOST + '/user/updateProfile',{
            method:'post',
            data:data,
            withCredentials: true} )
        .then(res=>{
            if(res.status === 200 && res.data.code === 0){
                // console.log(res.data);
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
                if(res.status ===200&&res.data.code===0){
                    // console.log(res.data);
                    return dispatch(authSUCCESS(res.data.data));
                }
                else{
                    return dispatch(errorMsg(res.data.msg));
                    // the error message will be determined by backend.
                }
            });
}
// create user directly from admin users list
export const createUser = (dispatch, {user, password, status,avatar}) => {
    if(!user||!password||!status||!avatar){
        return new Promise(
            function (resolve, reject){
                resolve(null);
            }
        );
    }

    return axios(constants.HOST +'/user/createUser',{
        method:'post',
        data: {user, password, status,avatar},
        withCredentials: true
    });
}


export const register = (dispatch,{user, password, confirmedPassword, status}) => {
    if(!user||!password||!status){
        return errorMsg('username and password must not be empty!');
    }
    if(password!== confirmedPassword){
        return errorMsg('password and confirmed password must be the same!');
    }
    let info = {user, password, status}

    if(user === 'admin'){
        let avatar = 'boy';
        status = 'admin';
        info = Object.assign({}, {user, password, status, avatar});
        console.log(info);
    }

    return axios(constants.HOST +'/user/register',{
            method:'post',
            data: info,
            withCredentials: true
        })
            .then(res=>{
                if(res.status ===200&&res.data.code===0){ // code 0 means login success
                    return dispatch(authSUCCESS({user, password, status}));
                }
                else{
                    return dispatch(errorMsg(res.data.msg));
                    // the error message will be determined by backend.
                }
            });

}


export function userList(data) {
    let filteredData = data.map(item => {
        const {password, ...d} = item;
        return d;
    });
    return {type: constants.USER_LIST, payload: filteredData};
}

export function getUserList(dispatch, status){
    return axios(constants.HOST + '/user/list?status='+status,{
            withCredentials: true
        }).then(res=>{
            if(res.data.code === 0){
                dispatch(userList(res.data.data))
            }
        })
}