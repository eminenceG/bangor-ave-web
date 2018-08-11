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
    }

    componentDidMount(){
        this.props.getFriendListForUserLoggedIn();
    }

    render(){
        return (
            <div className="container">
                <h2>Friend list</h2>
                {this.props.chatUser.userList?
                    <UserCard
                        userlist={this.props.chatUser.userList}
                    ></UserCard>:null}
            </div>
        )

    }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    getFriendListForUserLoggedIn: () => actions.getFriendListForUserLoggedIn(dispatch)

})



const FriendListContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(FriendList)


export default FriendListContainer;