import React from 'react'
import * as constants from "../../constants";
import io from 'socket.io-client'
import {connect} from 'react-redux'
import AuthRouteContainer from '../../components/auth-route/auth-route'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'


const socket = io(constants.HOST);


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: '123',
            message: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        // socket.emit('sendmsg', {text: this.state.textInput});

        const from = this.props.userReducer._id;
        console.log(this.props.userReducer._id);
        const to = this.props.match.params.user;
        const msg = this.state.textInput;
        this.props.sendMsg({from, to, msg});
        this.setState({textInput: ''});
    }

    componentDidMount() {
        this.props.getMsgList();
        this.props.recvMsg();
        console.log(this.props);
        // socket.on('receiveMessage', (data) => {
        //     this.setState({
        //         message: [
        //             ...this.state.message,
        //             data.text
        //         ]
        //     });
        //
        // });
    }

    render() {
        const user = this.props.match.params.user;
        return(
            <div className="container">
                <AuthRouteContainer/>
                <ul className="list-group">
                <li className=" active list-group-item">
                    to:
                    <em>{this.props.match.params.user}</em>
                </li>


                    {this.props.chatReducer.chatmsg.map(
                        v => {
                            if(v.from === user) {
                                return(
                                    <li key={v._id} className="list-group-item">
                                        <p className="float-left"
                                           >
                                            <em>receive</em> : {v.content}
                                            </p>
                                    </li>
                                )
                            } else {
                                return(
                                    <li key={v._id} className="list-group-item">
                                        <p  className="float-right"
                                            >
                                            <em>send</em> : {v.content}
                                        </p>
                                    </li>
                                )
                            }
                        }
                    )}
                </ul>
                <div>
                    {this.state.message.map(
                        message => {
                            return(
                                <p key={message}>
                                    {message}
                                </p>
                            )
                        }
                    )}
                </div>

                <div className="stick-footer container">
                    <div className="input-group mb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="message"
                               value={this.state.textInput}
                               onChange={event => {
                                   this.setState({textInput:  event.target.value})
                               }}
                               aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.handleSubmit()}
                                        type="button" id="button-addon2">
                                    Send
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}


const stateToPropertiesMapper = (state) =>(
    state
);

const dispatcherToPropsMapper = dispatch =>({
    getMsgList: () => getMsgList(dispatch),
    sendMsg: (send) => sendMsg(dispatch, send),
    recvMsg: () => recvMsg(dispatch)
});

const ChatContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Chat);

export default ChatContainer;