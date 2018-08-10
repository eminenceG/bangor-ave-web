import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import {Link} from 'react-router-dom';
import UserCard from '../usercard/usercard';


class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('admin');
    }

    render(){
        return (
            <div className="container">
                <h2>User Editor</h2>
                <div>
                    <input className="form-control" placeholder="name"/>
                    <br/>
                    <input className="form-control" placeholder="status"/>
                    <br/>
                    <input className="form-control" placeholder="avatar"/>
                    <br/>
                    <input className="form-control" placeholder="desc"/>
                    <br/>
                    <input className="form-control" placeholder="company"/>
                    <br/>
                    <input className="form-control" placeholder="money"/>
                    <br/>
                    <input className="form-control" placeholder="posDesc"/>
                    <br/>


                </div>


                <h2>User List</h2>
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



const adminContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Admin)

export default adminContainer;