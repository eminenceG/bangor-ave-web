// extract users list into char objects list.
import axios from 'axios'
import * as constants from "../constants/index";


const initState={
    applicationList:[]
}

// reducer: chat target
export function applicationReducer(state = initState, action){
    switch(action.type){
        case constants.APPLICATION_LIST:
            return {...state, applicationList: action.payload}
        default:
            return state;
    }
}
