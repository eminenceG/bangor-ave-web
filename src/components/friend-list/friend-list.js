import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import UserCard from '../usercard/usercard';
import RelationCard from '../relationCard/relationCard';
import AuthRouteContainer from '../../components/auth-route/auth-route'

class FriendList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        this.handleDisConnect = this.handleDisConnect.bind(this);
    }

    componentDidMount(){
        if(this.props.userReducer.status!=='admin'){
            this.props.getFriendListForUserLoggedIn();
        } else {
            this.props.getFriendshipListAdmin();
        }
    }

    componentWillReceiveProps(newProps){
        if(this.props.friendshipReducer.friendshipList.length !== 0 || this.props.chatUser.userList.length !== 0) return;

        if(this.props.userReducer.status!=='admin'){
            this.props.getFriendListForUserLoggedIn();
        } else {
            this.props.getFriendshipListAdmin();
        }
    }


    handleDisConnect(v){
        // console.log(v._id);
        if(this.props.userReducer.status!=='admin'){
            this.props.breakFriend(v._id)
                .then(()=>{this.props.getFriendListForUserLoggedIn()});
        } else {
            this.props.breakFriendAdmin(v)
                .then(()=>{this.props.getFriendshipListAdmin()});
        }


    }

    render(){
        return (
            <div className="container">
                <AuthRouteContainer/>
                <h2>Friend list</h2>
                {this.props.chatUser.userList&&this.props.userReducer.status!=='admin'?
                    <UserCard
                        userlist={this.props.chatUser.userList} page={'friendlist'} handleDisConnect={this.handleDisConnect}
                    />:null}

                {this.props.friendshipReducer.friendshipList&&this.props.userReducer.status==='admin'?
                    <div>
                        <RelationCard
                            friendshipList={this.props.friendshipReducer.friendshipList} page={'friendlist'} handleDisConnect={this.handleDisConnect} context={'friendshipAdmin'}
                        />
                    </div>
                :null}
            </div>
        )

    }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    getFriendListForUserLoggedIn: () => actions.getFriendListForUserLoggedIn(dispatch),
    getFriendshipListAdmin: () => actions.getFriendshipListAdmin(dispatch),
    breakFriend: (friendId) => actions.breakFriend(dispatch, friendId),
    breakFriendAdmin: (friendship) => actions.breakFriendAdmin(dispatch, friendship)
})



const FriendListContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(FriendList)


export default FriendListContainer;