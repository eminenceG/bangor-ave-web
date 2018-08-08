import * as constants from "../../constants";
import io from 'socket.io-client'
import axios from 'axios'

const socket = io(constants.HOST);

const MSG_LIST = 'MSG_LIST';
const MSG_RECEIVE = 'MSG_RECEIVE';
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    unread: 0
};

export function chat(state=initState, action) {
    
    switch (action.type) {

        case MSG_LIST:



    }
    
}