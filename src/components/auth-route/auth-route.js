import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import * as constants from "../../constants";
@withRouter
class AuthRoute extends React.Component{

    componentDidMount(){
        const publicList = ['/login', 'register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        // get user information
        axios(constants.HOST + '/user/info',{
                withCredentials: true
            })
            .then(res=>{
                if(res.status===200){
                    if(res.data.code===0){
                        //with login info
                        this.props.loadData(res.data.data);
                        if(this.props.location.pathname==='/'){
                            this.props.history.push('/me'); // without login info, force redirect to login page.
                        }
                    }
                    else{
                        this.props.authFAIL();
                        if(this.props.location.pathname!=='/'){
                            this.props.history.push('/login'); // without login info, force redirect to login page.
                        }
                    }


                    // console.log(res.data);
                }
            });
        // logged in?

        // current url? log in does not require jump

        // status

        // user info is completed?
    }
    render(){
        return null;
    }

}

const dispatcherToPropsMapper = dispatch =>({
    loadData: (data) => actions.loadData(dispatch, data),
    authFAIL: () => actions.authFAIL(dispatch),
    changeRedirectTo: (target) => actions.changeRedirectTo(dispatch, target)
})

const AuthRouteContainer = connect(null,dispatcherToPropsMapper)(AuthRoute)

export default AuthRouteContainer;