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

class ApplicantProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar:null,
            title: '',
            desc: ''
        };

        this.onChange = this.onChange.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        this.setState({
            avatar: this.props.avatar,
            title: this.props.title,
            desc: this.props.desc
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            avatar: nextProps.avatar,
            title: nextProps.title,
            desc: nextProps.desc
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
              window.location.href = window.location.href;
            }
          },
          {
            label: 'No',
            onClick: () => console.log('cancel');
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
        let inputElemTitle;
        let inputElemPosDesc;
        // console.log(this.props);
        // console.log(this.state);
        //this.props.redirectTo&&this.props.redirectTo!=this.props.location.pathname
        // only redirect when current location is different from target url.
        return(
            <div>
                <AuthRouteContainer></AuthRouteContainer>
                {this.props.redirectTo&&this.props.redirectTo!==this.props.location.pathname? <Redirect to = {this.props.redirectTo}></Redirect>:null}
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
                        placeholder="Applying Position"
                        className="form-control mb-3"
                        value={this.state.title}
                        onChange={()=>this.onChange('title',inputElemTitle.value)}
                        ref={node=> inputElemTitle = node}/>

                    <textarea
                        placeholder="Self Description"
                        className="form-control mb-3"
                        value={this.state.desc}
                        onChange={()=>this.onChange('desc',inputElemPosDesc.value)}
                        ref={node=> inputElemPosDesc = node}/>
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
    update: (userInfo) => actions.updateProfile(dispatch, userInfo)

})



const ApplicantProfileContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(ApplicantProfile)

export default ApplicantProfileContainer;