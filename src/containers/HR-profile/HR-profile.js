import React from 'react';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import '../../index.css'
import {connect} from 'react-redux';
import * as actions from "../../actions";
import { Redirect } from 'react-router-dom';
import AuthRouteContainer from '../../components/auth-route/auth-route'
class HRProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar:null,
            title: '',
            company: '',
            money: '',
            posDesc: ''
        };
        this.onChange = this.onChange.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    componentDidMount(){
        this.setState({
            avatar: this.props.userReducer.avatar,
            title: this.props.userReducer.title,
            company: this.props.userReducer.company,
            money: this.props.userReducer.money,
            posDesc: this.props.userReducer.posDesc
        });

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            avatar: nextProps.userReducer.avatar,
            title: nextProps.userReducer.title,
            company: nextProps.userReducer.company,
            money: nextProps.userReducer.money,
            posDesc: nextProps.userReducer.posDesc
        });

    }

    onChange(key, val){
        this.setState({
            [key]:val
        })
    }

    selectAvatar(imageName){
        this.setState({
            avatar: imageName
        });
    }

    render(){
        document.body.style = 'background: white;';
        let inputElemTitle;
        let inputElemCompany;
        let inputElemMoney;
        let inputElemPosDesc;
        console.log(this.props);
        console.log(this.state);
        //this.props.redirectTo&&this.props.redirectTo!=this.props.location.pathname
        // only redirect when current location is different from target url.
        return(
                <div>
                    <AuthRouteContainer></AuthRouteContainer>
                    {this.props.userReducer.redirectTo&&this.props.userReducer.redirectTo!==this.props.location.pathname? <Redirect to = {this.props.redirectTo}></Redirect>:null}
                    <nav className="navbar navbar-expand-md bg-dark fixed-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/HR-profile" style={{color : "#FFF"}}>HR-profile</a>
                            </div>
                        </div>
                    </nav>
                    <br/>
                    <br/>
                    <br/>

                    <div className="container">
                        <AvatarSelector
                            selectAvatar={this.selectAvatar} avatar = {this.state.avatar}
                        ></AvatarSelector>
                        <br/>
                        <input
                            placeholder="Hiring Position"
                            className="form-control mb-3"
                            value={this.state.title}
                            onChange={()=>this.onChange('title',inputElemTitle.value)}
                            ref={node=> inputElemTitle = node}/>

                        <input
                            placeholder="Company name"
                            className="form-control mb-3"
                            value={this.state.company}
                            onChange={()=>this.onChange('company',inputElemCompany.value)}
                            ref={node=> inputElemCompany = node}/>

                        <input
                            placeholder="Salary offering"
                            className="form-control mb-3"
                            value={this.state.money}
                            onChange={()=>this.onChange('money',inputElemMoney.value)}
                            ref={node=> inputElemMoney = node}/>

                        <textarea
                            placeholder="Position requirement"
                            className="form-control mb-3"
                            value={this.state.posDesc}
                            onChange={()=>this.onChange('posDesc',inputElemPosDesc.value)}
                            ref={node=> inputElemPosDesc = node}/>
                        <button className="btn btn-primary"
                                onClick={()=>{
                                    this.props.update(this.state);
                                }}>Save</button>
                    </div>
                </div>
            )

    }
}


const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    update: (userInfo) => actions.updateProfile(dispatch, userInfo)

})



const HRProfileContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(HRProfile)

export default HRProfileContainer;