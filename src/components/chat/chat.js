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
            textInput: '',
            message: [],
            listened: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        // socket.emit('sendmsg', {text: this.state.textInput});
        console.log('send');
        const from = this.props.userReducer._id;
        const to = this.props.match.params.user;
        const msg = this.state.textInput;
        this.props.sendMsg({from, to, msg});
        this.setState({textInput: ''});
    }

    componentDidMount() {
        if(this.props.chatReducer.chatmsg.length !== 0)
            return;
        this.props.getMsgList();
        this.props.recvMsg();
        // console.log(this.props);
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

        const userId = this.props.match.params.user;
        const from = this.props.userReducer._id;
        const to = this.props.match.params.user;
        const chatId = [from, to].sort().join('_');
        const users = this.props.chatReducer.users;

        if(!users || !users[userId]) {
            return null;
        }

        return(
            <div className="container">
                <AuthRouteContainer/>
                <ul className="list-group">
                <li style={{textAlign: 'center'}}
                    className="active list-group-item">
                    Chatting with:
                    <strong style={{marginLeft: 10}}>{users[userId].name}</strong>
                </li>

                    {this.props.chatReducer.chatmsg.map(
                        v => {
                            if(v.chatid === chatId && v.from === userId) {
                                return(
                                    <li key={v._id} className="list-group-item">
                                        <div className="col-9 float-left row">
                                            <div className="col-1">
                                                <img className="float-left"
                                                     style={{width: 50}}
                                                     src={require(`../img/${users[userId].avatar}.png`)}
                                                     alt="Card image cap"/>
                                            </div>
                                            <div className="col-11" >
                                                <p style={{padding: 10, border: "0.5px solid #141416", borderRadius: "5px"}}
                                                    className="float-left">
                                                    {v.content}
                                                </p>
                                            </div>
                                        </div>

                                    </li>
                                )
                            } else if(v.chatid === chatId && v.to === userId){
                                return(
                                    <li key={v._id} className="list-group-item">
                                        <div className="col-9 float-right">
                                            <div className="row">
                                                <div className="col-11" >
                                                    <p style={{padding: 10, border: "0.5px solid #27983d", borderRadius: "5px"}}
                                                       className="float-right">{v.content}</p>
                                                </div>
                                                <div className="col-1">
                                                    <img className="float-right"
                                                         style={{width: 50}}
                                                         src={require(`../img/${users[from].avatar}.png`)}
                                                         alt="Card image cap"/>
                                                </div>
                                            </div>
                                        </div>


                                    </li>
                                )
                            }
                            return null;
                        }
                    )}
                </ul>
                <div  style={{marginBottom: 200}} >
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

                <div className="stick-footer fixed-bottom container">
                    <div className="input-group mb-3">
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary"
                                    onClick={() => this.props.history.goBack()}
                                    type="button" id="button-addon2">
                                Go Back
                            </button>
                        </div>
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
    sendMsg: (send) => sendMsg(dispatch, send),
    getMsgList: () => getMsgList(dispatch),
    recvMsg: () => recvMsg(dispatch)
});

const ChatContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Chat);

export default ChatContainer;