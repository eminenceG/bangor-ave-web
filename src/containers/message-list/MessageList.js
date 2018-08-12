import React from 'react'
import {getMsgList, recvMsg, sendMsg} from "../../redux/chat.redux";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'


class MessageList extends React.Component {


    componentDidMount() {
        this.props.getMsgList();
    }



    componentWillReceiveProps() {
        if(this.props.chatReducer.chatmsg.length === 0) {
            this.props.getMsgList();
        }

    }


    render() {

        const userId = this.props.userReducer._id;

        const usersId = this.props.chatReducer.users ? Object.keys(this.props.chatReducer.users) : [];
        const users = this.props.chatReducer.users;



        return(
            <div>
                <h3 style={{marginTop: 60, textAlign: 'center', fontFamily: 'Comic Sans MS'}}>
                    Messages from all users
                </h3>
                <p style={{marginTop: 10, textAlign: 'center', fontFamily: 'Comic Sans MS'}}>
                    Click message to enter the chat room of the corresponding user
                </p>
                <ul className="list-group">
                    {usersId.map(id => (
                        this.props.chatReducer.chatmsg.map(
                            v=>{
                                if(v.from === userId) return null;
                                if (v.from === id) {
                                    return(
                                        <li key={v._id} className="list-group-item">
                                            <Link style={{color: 'black'}}  to={`/chat/${v.from}`}>
                                                <div className="col-8 float-left row">
                                                    <div className="col-1">
                                                        <img className="float-left"
                                                             style={{width: 50}}
                                                             src={require(`../../components/img/${users[v.from].avatar}.png`)}
                                                             alt="Card image cap"/>

                                                    </div>
                                                    <div className="col-11">
                                                        <p style={{
                                                            padding: 10,
                                                            border: "0.5px solid #141416",
                                                            borderRadius: "5px"
                                                        }}
                                                           className="float-left">
                                                            {v.content}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-4 float-right">
                                                    <p>username:
                                                        <em style={{fontFamily:'Comic Sans MS'}}>
                                                            {users[v.from].name}
                                                        </em>
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                } else {
                                    return null
                                }
                            }
                    )))}
                </ul>
            </div>


        )



    }


}



const stateToPropertiesMapper = (state) =>(
    state
);

const dispatcherToPropsMapper = dispatch =>({
    sendMsg: (send) => sendMsg(dispatch, send),
    getMsgList: () => getMsgList(dispatch)
});

const MessageListContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(MessageList);

export default MessageListContainer;

