import React from 'react'
import axios from 'axios'



class AuthRoute extends React.Component{

    componentDidMount(){
        // get user information
        axios.get('/user/info')
            .then(res=>{
                if(res.status==200){
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