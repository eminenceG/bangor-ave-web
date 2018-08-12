import axios from "axios/index";
import * as constants from "../constants";

let _singleton = Symbol();
export default class ChatServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) throw new Error('Cannot instantiate directly');
    }

    static get instance() {
        if (!this[_singleton]) this[_singleton] = new ChatServiceClient(_singleton);
        return this[_singleton];
    }




    getMessageList() {
        return axios(constants.HOST + '/user/getmsglist', {
            withCredentials: true
        }).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                return {
                    message: res.data.msgs,
                    users: res.data.users
                }
            }
        })
    }


}
