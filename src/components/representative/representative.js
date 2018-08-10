import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../actions";
import UserCard from '../usercard/usercard';


class Representative extends React.Component {


    constructor(props) {
        super(props);
    }


    componentDidMount(){
        this.props.getUserList('representative');
    }

    render() {
        return(
            <div className="container">
                <h2>User List</h2>
                {this.props.chatUser.userList?
                    <UserCard
                        userlist={
                            this.props.chatUser.userList.filter(
                                user => user.status !== 'admin' && user.status!== 'representative'
                            )
                        }
                    />:null}
            </div>



        )
    }


}


const stateToPropertiesMapper = (state) =>(
    state
);

const dispatcherToPropsMapper = dispatch =>({
    getUserList: (userInfo) => actions.getUserList(dispatch, userInfo)
});



const RepresentativeContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Representative);

export default RepresentativeContainer;