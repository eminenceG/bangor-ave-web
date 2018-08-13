// extract users list into char objects list.
import axios from 'axios'
import * as constants from "../constants/index";


const initState={
    friendshipList: []
}

// reducer: chat target
export function friendshipReducer(state = initState, action){
    switch(action.type){
        case constants.FRIENDSHIP_LIST:
            return {...state, friendshipList: action.payload}
        default:
            return state;
    }
}
