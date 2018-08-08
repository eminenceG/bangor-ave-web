import React from 'react'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import { Redirect } from 'react-router-dom'

// only pass state.user to register, so that other field will be updated to
// register only when they are changed in the input field.

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            password:'',
            confirmedPassword:'',
            status: 'applicant'
        };
        this.handleRegister = this.handleRegister.bind(this);

    }

    handleRegister(){
        this.props.register(this.state);
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }

    render(){
        document.body.style = 'background: white;';
        let selectElem;
        let inputElemUser;
        let inputElemPassword;
        let inputElemConfirmedPassword;
        return (
            <div>
                {this.props.userReducer.redirectTo? <Redirect to={this.props.userReducer.redirectTo}/>:null}

                <Logo></Logo>
                <div className="container">
                    <h2>Register</h2>

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
                        <input
                            placeholder="Confirmed Password"
                            type="password"
                            className="form-control mb-3"
                            value={this.state.confirmedPassword}
                            onChange={()=>this.handleChange('confirmedPassword',inputElemConfirmedPassword.value)}
                            ref={node=> inputElemConfirmedPassword = node}/>
                    </div>

                    <select
                        className="form-control mb-3"
                        value={this.state.status}
                        onChange={()=>this.handleChange('status',selectElem.value)}
                        ref={node=> selectElem = node}>
                        <option disabled="disabled">Choose status</option>
                        <option value="Applicant">Applicant</option>
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                        <option value="CompanyManager">CompanyManager</option>
                    </select>

                    <button
                        onClick={this.handleRegister}
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
    register: (userInfo) => actions.register(dispatch, userInfo)

})

const RegisterContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Register)

export default RegisterContainer;