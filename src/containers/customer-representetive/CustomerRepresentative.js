import React from 'react'
import {getMsgList, sendMsg} from "../../redux/chat.redux";
import {connect} from "react-redux";
import * as actions from "../../actions";
import { Link } from 'react-router-dom'
import UserCard from '../../components/usercard/usercard';



class CustomerRepresentative extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };


        this.renderUsers = this.renderUsers.bind(this);


    }

    componentDidMount(){
        this.props.getUserList('representative')
            .then(
                () => {
                    this.setState(
                        {
                            users: this.props.chatUser.userList.filter(
                                (user) => user.status === 'representative')
                        })

                }
            );
    }

    renderUsers() {
        return this.state.users.map(
            v => (
                <li className="list-group-item" key={v.user}>
                    <div className="row">
                        <div className="col-4">
                            <div>
                                <img className="card-img-top"
                                     style={{width: '180px'}}
                                     src={require(`../../components/img/${v.avatar}.png`)}
                                     alt="Card image cap"/>
                            </div>
                            <div>
                                <Link to={`/chat/${v._id}`} >
                                    <button style={{marginTop: 20, marginBottom: 20, width: '180px'}}
                                            className="btn btn-block btn-dark">
                                        Chat
                                    </button>
                                </Link>
                            </div>

                        </div>
                        <div className="col-6">
                            <div className="card-body">
                                <h5 className="card-title">name: {v.user}</h5>
                                <p className="card-text">status: {v.status}</p>
                                <p className="card-text">Click the chat button to chat with our customer representatives</p>
                            </div>
                        </div>
                    </div>
                </li>
                    )
        )
    }


    render() {
        return(
            <div className="container">
            <ul className="list-group">
                {this.renderUsers()}
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
    getMsgList: () => getMsgList(dispatch),
    getUserList: (userInfo) => actions.getUserList(dispatch, userInfo),
});

const CustomerRepresentativeContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(CustomerRepresentative);

export default CustomerRepresentativeContainer;