import React from 'react';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import '../../index.css'
import {connect} from 'react-redux';
import * as actions from "../../actions";
import { Redirect } from 'react-router-dom';
import AuthRouteContainer from '../../components/auth-route/auth-route'
import browserCookie from 'browser-cookies';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class CompanyManagerProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar: null,
            title: '',
            desc: '',
            company: '',
            companyImg: ''
        };

        this.onChange = this.onChange.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        this.setState({
            avatar: this.props.userReducer.avatar,
            title: this.props.userReducer.title,
            desc: this.props.userReducer.desc
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            avatar: nextProps.userReducer.avatar,
            title: nextProps.userReducer.title,
            desc: nextProps.userReducer.desc
        });
    }

    logout() {
      confirmAlert({
        title: 'Logout',
        message: 'Are you sure to logout?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              browserCookie.erase('userId');
              this.props.logoutSubmit()
            }
          },
          {
            label: 'No',
            onClick: () => console.log('cancel')
          }
        ]
      })
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
        let inputElemComp;
        let inputElemPosDesc;
        let inputElemImg;
        // console.log(this.props);
        // console.log(this.state);
        //this.props.redirectTo&&this.props.redirectTo!=this.props.location.pathname
        // only redirect when current location is different from target url.
        return(
            <div>
                <AuthRouteContainer></AuthRouteContainer>
                {this.props.userReducer.redirectTo&&this.props.userReducer.redirectTo!==this.props.location.pathname? <Redirect to = {this.props.userReducer.redirectTo}></Redirect>:null}
                <nav className="navbar navbar-expand-md bg-dark fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/applicant-profile" style={{color : "#FFF"}}>Applicant-profile</a>
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
                        placeholder="Company Name"
                        className="form-control mb-3"
                        value={this.state.company}
                        onChange={()=>this.onChange('company', inputElemComp.value)}
                        ref={node=> inputElemComp = node}/>

                    <textarea
                        placeholder="Company Description"
                        className="form-control mb-3"
                        value={this.state.desc}
                        onChange={()=>this.onChange('desc', inputElemPosDesc.value)}
                        ref={node=> inputElemPosDesc = node}/>
                    
                    <input
                      placeholder="Company Image URL"
                      className="form-control mb-3"
                      value={this.state.companyImg}
                      onChange={()=>this.onChange('companyImg', inputElemImg.value)}
                      ref={node=> inputElemImg = node}/>


                    <button className="btn btn-primary"
                            onClick={()=>{
                                this.props.update(this.state);
                            }}>Save</button>
                    <button
                      className="btn btn-primary"
                      onClick={this.logout}
                    >
                      Logout
                    </button>
                </div>
            </div>
        )

    }
}


const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    update: (userInfo) => actions.updateProfile(dispatch, userInfo),
    logoutSubmit: () => actions.logoutSubmit(dispatch)
})



const CompanyManagerProfileContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(CompanyManagerProfile)

export default CompanyManagerProfileContainer;