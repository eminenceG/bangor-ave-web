import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import UserCard from '../usercard/usercard';


class FriendList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        this.handleDisConnect = this.handleDisConnect.bind(this);
    }

    componentDidMount(){
        this.props.getFriendListForUserLoggedIn();
    }

    handleDisConnect(v){
        // console.log(v._id);
        this.props.breakFriend(v._id)
            .then(()=>{this.props.getFriendListForUserLoggedIn()});
    }

    render(){
        return (
            <div className="container">
                <h2>Friend list</h2>
                {this.props.chatUser.userList?
                    <UserCard
                        userlist={this.props.chatUser.userList} page={'friendlist'} handleDisConnect={this.handleDisConnect}
                    ></UserCard>:null}
            </div>
        )

    }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    getFriendListForUserLoggedIn: () => actions.getFriendListForUserLoggedIn(dispatch),
    breakFriend: (friendId) => actions.breakFriend(dispatch, friendId)
})



const FriendListContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(FriendList)


export default FriendListContainer;