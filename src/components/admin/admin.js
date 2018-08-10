import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import {Link} from 'react-router-dom';
import UserCard from '../usercard/usercard';


class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
           user:'',
           status:'applicant',
           avatar:'',
           desc:'',
           title:'',
           company:'',
           money:'',
           posDesc:'',
           password:'',
           action:'add'
        }
        this.onChange = this.onChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount(){
        this.props.getUserList('admin');
    }


    onChange(key, val){
        this.setState({
            [key]:val
        })
    }

    handleRegister(){
        let info = {user: this.state.user, password: this.state.password, status: this.state.status, avatar: this.state.avatar};
        this.props.createUser(info)
            .then(res=>{
                if(res === null){
                    alert('user cannot be created.');
                    return;
                }
                this.props.getUserList('admin');
                if(res.data.code === 0){
                    alert('user has been created!');
                } else {
                    alert('user cannot be created.');
                }
            });
    }

    handleEdit(){
    }

    render(){
        let selectElem;
        let inputElemName;
        let inputAvatar;
        let inputCompany;
        let inputMoney;
        let inputposDesc;
        let inputDesc;
        let inputPassword;
        return (
            <div className="container">
                <h2>User Editor</h2>
                <div className="container">
                    <input
                        className="form-control mb-3"
                        placeholder="name"
                        value={this.state.user}
                        onChange={()=>this.onChange('user',inputElemName.value)}
                        ref={node=> inputElemName = node}/>
                    <input
                        className="form-control mb-3"
                        placeholder="password"
                        value={this.state.password}
                        onChange={()=>this.onChange('password',inputPassword.value)}
                        ref={node=> inputPassword = node}/>
                    <input
                        className="form-control mb-3"
                        placeholder="avatar"
                        value={this.state.avatar}
                        onChange={()=>this.onChange('avatar',inputAvatar.value)}
                        ref={node=> inputAvatar = node}/>
                    <select
                        className="form-control mb-3"
                        value={this.state.status}
                        onChange={()=>this.onChange('status',selectElem.value)}
                        ref={node=> selectElem = node}>
                        <option disabled="disabled">Choose status</option>
                        <option value="applicant">Applicant</option>
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                        <option value="CompanyManager">CompanyManager</option>
                    </select>


                    {this.state.status === 'HR' && this.state.action==='edit'?<div>
                        <input className="form-control mb-3"
                                placeholder="company"
                               value={this.state.company}
                               onChange={()=>this.onChange('company',inputCompany.value)}
                               ref={node=> inputCompany = node}/>
                        <br/>
                        <input className="form-control mb-3"
                                placeholder="money"
                               value={this.state.money}
                               onChange={()=>this.onChange('money',inputMoney.value)}
                               ref={node=> inputMoney = node}/>
                        <br/>
                        <textarea className="form-control mb-3"
                                placeholder="Position Description"
                               value={this.state.posDesc}
                               onChange={()=>this.onChange('posDesc',inputposDesc.value)}
                               ref={node=> inputposDesc = node}/>
                        <br/>
                    </div>:null}

                    {this.state.status === 'applicant' && this.state.action==='edit'?<div>
                        <textarea className="form-control mb-3"
                                placeholder="Self description"
                               value={this.state.desc}
                               onChange={()=>this.onChange('desc',inputDesc.value)}
                               ref={node=> inputDesc = node}/>
                        <br/>
                    </div>:null}


                    {this.state.action==='add'?
                        <button
                            className="btn btn-success"
                            onClick={this.handleRegister}>Add user</button>
                        :null}

                    {this.state.action==='edit'?
                        <button className="btn btn-success">Edit done!</button>
                        :null}
                </div>

                <br/>
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
    getUserList: (userInfo) => actions.getUserList(dispatch, userInfo),
    createUser: (userInfo) => actions.createUser(dispatch, userInfo)
})



const adminContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Admin)

export default adminContainer;