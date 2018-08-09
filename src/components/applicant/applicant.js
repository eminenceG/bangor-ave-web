import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import UserCard from '../usercard/usercard';
import {Link} from 'react-router-dom';


class Applicant extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('HR');
    }

    render(){
        return (
            <div className="container">
                <h2>HR List</h2>
                <UserCard
                  userlist={this.props.chatUser.userList}
                ></UserCard>
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



const ApplicantContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Applicant)

export default ApplicantContainer;