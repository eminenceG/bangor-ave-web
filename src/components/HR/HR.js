import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import UserCard from '../usercard/usercard';


class HR extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        this.handleConnect = this.handleConnect.bind(this);
        this.handleDisConnect = this.handleDisConnect.bind(this);
    }

    componentDidMount(){
        this.props.getUserList('applicant');
    }

    handleConnect(v){
        // console.log(v);
        this.props.makeFriend(v._id)
            .then(()=>{this.props.getUserList('applicant')});
    }
    handleDisConnect(v){
        // console.log(v._id);
        this.props.breakFriend(v._id)
            .then(()=>{this.props.getUserList('applicant')});
    }

    render(){
        return (
            <div className="container">
                <h2>Applicant List</h2>
                {this.props.chatUser.userList?
                <UserCard
                  userlist={this.props.chatUser.userList} handleConnect={this.handleConnect} handleDisConnect={this.handleDisConnect}
                ></UserCard>:null}
            </div>
        )

    }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    getUserList: (userInfo) => actions.getUserList(dispatch, userInfo),
    makeFriend: (friendId) => actions.makeFriend(dispatch, friendId),
    breakFriend: (friendId) => actions.breakFriend(dispatch, friendId)

})



const HRContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(HR)

export default HRContainer;