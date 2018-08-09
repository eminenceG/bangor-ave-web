import * as constants from "../constants";
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

export function chatReducer(state=initState, action) {
    // console.log('chat', action);
    switch(action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload,
                unread: action.payload.filter(
                    msg => !msg.read
                ).length
            };
        case MSG_RECEIVE:
            // console.log(action.payload);
            const temp = state.chatmsg;
            for(let i = 0; i < temp.length; i++) {
                if(action.payload === temp[i]) {
                    // console.log('equal');
                    return state
                }
            }
            return {
                chatmsg: [
                    ...state.chatmsg,
                    action.payload
                ],
                unread: state.unread + 1
            };
        default:
            return state;
    }
}

function msgList(messages) {
    return {
        type: 'MSG_LIST',
        payload : messages
    }
}

function msgRecv(msg) {
    return {type: MSG_RECEIVE, payload: msg}
}

export function recvMsg(dispatch) {
    return socket.on('recvmsg', (data) => {

        dispatch(msgRecv(data))
    })
}

export function sendMsg(dispatch, send) {
    console.log(send);
    return socket.emit('sendmsg', send)
}

export function getMsgList(dispatch) {
    // console.log(dispatch);
    return axios.get(constants.HOST + '/user/getmsglist')
        .then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(msgList(res.data.msgs))
            }
        })

}