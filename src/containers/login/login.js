import React from 'react'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import { Redirect } from 'react-router-dom'


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            password:''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }

    handleLogin(){
        this.props.login(this.state);
    }
    register(){
        this.props.history.push('/register')
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }


    render(){
        document.body.style = 'background: white;';
        let inputElemUser;
        let inputElemPassword;
        console.log(this.props);
        return(
            <div>
                {this.props.userReducer.redirectTo? <Redirect to={this.props.userReducer.redirectTo}/>:null}

                <Logo></Logo>
                <div className="container">
                    <h2>Login</h2>

                    <div>
                        {this.props.userReducer.msg?<p className='error-msg'>{this.props.userReducer.msg}</p>:null}

                        <input
                            placeholder="Username"
                            className="form-control mb-3"
                            value={this.state.user}
                            onChange={()=>this.handleChange('user',inputElemUser.value)}
                            ref={node=> inputElemUser = node}/>
                        <input
                            placeholder="Password"
                            type="password"
                            className="form-control mb-3"
                            value={this.state.password}
                            onChange={()=>this.handleChange('password',inputElemPassword.value)}
                            ref={node=> inputElemPassword = node}/>
                    </div>


                    <button
                        onClick={this.handleLogin}
                        className="btn btn-primary" style={{marginRight: "5px"}}>Login</button>

                    <button
                        onClick={this.register}
                        className="btn btn-primary"
                        style={{marginRight: "5px"}}>Register</button>
                </div>
            </div>
        )
    }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    login: (userInfo) => actions.login(dispatch, userInfo)

})



const LoginContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Login)

export default LoginContainer;