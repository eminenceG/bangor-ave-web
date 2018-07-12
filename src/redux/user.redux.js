import axios from 'axios'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState={
    isAuth:false,
    msg:'',
    user:'',
    pwd:'',
    type:''
}

//reducer
export function user(state=initState, action){
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state, msg:'', isAuth:true, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        default:
            return state;
    }

}

function registerSUCCESS(data){
    return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg){
    return {msg, type:ERROR_MSG}
}

export function register({user, pwd, confirmedPWD, status}){
    if(!user||!pwd||!status){
        return errorMsg('username and password must not be empty!');
    }
    if(pwd!== confirmedPWD){
        return errorMsg('password and confirmed password must be the same!');
    }

    return dispatch=>{
        axios.post('/user/register',{user, pwd, status})
            .then(res=>{
                if(res.status ==200&&res.data.code===0){
                    dispatch(registerSUCCESS({user, pwd, status}));
                }
                else{
                    dispatch(errorMsg(res.data.msg));
                    // the error message will be determined by backend.
                }
            });
    }
}