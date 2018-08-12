// extract users list into char objects list.
import axios from 'axios'
import * as constants from "../constants/index";


const initState={
    userList: [],
    jobList:[]
}

// reducer: chat target
export function chatUser(state = initState, action){
    switch(action.type){
        case constants.USER_LIST:
            return {...state, userList: action.payload}
        case constants.JOB_LIST:
            return {...state, jobList: action.payload}
        default:
            return state;
    }
}
