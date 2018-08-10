import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../actions";


class HrJob extends React.Component {


    render() {
        return (
            <h1>hr job</h1>
        )
    }

}


const stateToPropertiesMapper = (state) =>(
    state.userReducer
);

const dispatcherToPropsMapper = dispatch =>({
    update: (userInfo) => actions.updateProfile(dispatch, userInfo)

});



const HrJobContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(HrJob);

export default HrJobContainer;