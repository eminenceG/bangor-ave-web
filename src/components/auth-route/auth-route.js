import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter

class AuthRoute extends React.Component{

    componentDidMount(){
        const publicList = ['/login', 'register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        // get user information
        axios.get('/user/info')
            .then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                        //with login info
                    }
                    else{
                        this.props.history.push('/login'); // without login info, force redirect to login page.
                    }


                    console.log(res.data);
                }
            });
        // logged in?

        // current url? log in does not require jump

        // status

        // user info is completed?
    }
    render(){
        return <p>place where judge jump</p>
    }

}

export default AuthRoute;