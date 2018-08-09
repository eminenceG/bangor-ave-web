import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import {Link} from 'react-router-dom';
import UserCard from '../usercard/usercard';


class HR extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('applicant');
    }

    render(){
        return (
            <div className="container">
                <h2>Applicant List</h2>
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
    getUserList: (userInfo) => actions.getUserList(dispatch, userInfo)

})



const HRContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(HR)

export default HRContainer;