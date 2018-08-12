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
import {Link} from 'react-router-dom'

class ApplicantProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar:null,
            title: '',
            desc: '',
            email:'',
            phone:'',
            address:'',
            dob:'',
            cvLink:'',
            education:'',
            skills:'',
            experience:'',
            awards:'',
            publications:'',
            languages:'',
            website:''
        };

        this.onChange = this.onChange.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
        this.logout = this.logout.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
    }

    componentDidMount(){
        this.setState({
            avatar: this.props.userReducer.avatar,
            title: this.props.userReducer.title,
            desc: this.props.userReducer.desc,
            email: this.props.userReducer.email,
            phone: this.props.userReducer.phone,
            address: this.props.userReducer.address,
            dob: this.props.userReducer.dob,
            cvLink: this.props.userReducer.cvLink,
            education: this.props.userReducer.education,
            skills: this.props.userReducer.skills,
            experience: this.props.userReducer.experience,
            awards: this.props.userReducer.awards,
            publications: this.props.userReducer.publications,
            languages: this.props.userReducer.languages,
            website: this.props.userReducer.website,

        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            avatar: nextProps.userReducer.avatar,
            title: nextProps.userReducer.title,
            desc: nextProps.userReducer.desc,
            email: nextProps.userReducer.email,
            phone: nextProps.userReducer.phone,
            address: nextProps.userReducer.address,
            dob: nextProps.userReducer.dob,
            cvLink: nextProps.userReducer.cvLink,
            education: nextProps.userReducer.education,
            skills: nextProps.userReducer.skills,
            experience: nextProps.userReducer.experience,
            awards: nextProps.userReducer.awards,
            publications: nextProps.userReducer.publications,
            languages: nextProps.userReducer.languages,
            website: nextProps.userReducer.website
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

    handleSaveButton() {
      console.log("save");
      this.props.update(this.state)
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
        let inputEmail;
        let inputPhone;
        let inputAddress;
        let inputDOB;
        let inputCV;
        let inputEdu;
        let inputSkill;
        let inputExp;
        let inputAwards;
        let inputPub;
        let inputLanguages;
        let inputWebsite;
        // console.log(this.props);
        // console.log(this.state);
        // this.props.redirectTo&&this.props.redirectTo!=this.props.location.pathname
        // only redirect when current location is different from target url.
        return(
            <div>
                <AuthRouteContainer></AuthRouteContainer>
                {this.props.userReducer.redirectTo&&this.props.userReducer.redirectTo!==this.props.location.pathname? <Redirect to = {this.props.userReducer.redirectTo}></Redirect>:null}
                <nav className="navbar navbar-expand-md bg-dark fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/applicant-profile" style={{color : "#FFF"}}>Profile</a>
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
                    <label htmlFor="name">Target Position</label>
                    <input
                        placeholder="Target Position"
                        className="form-control mb-3"
                        value={this.state.title}
                        onChange={()=>this.onChange('title',inputElemTitle.value)}
                        ref={node=> inputElemTitle = node}/>
                    <label htmlFor="name">Self Description</label>
                    <textarea
                        placeholder="Self Description"
                        className="form-control mb-3"
                        value={this.state.desc}
                        onChange={()=>this.onChange('desc',inputElemPosDesc.value)}
                        ref={node=> inputElemPosDesc = node}/>
                    <hr/>

                    <label htmlFor="name">Link to my Resume</label>
                    <input
                        placeholder="Link to my Resume"
                        className="form-control mb-3"
                        value={this.state.cvLink}
                        onChange={()=>this.onChange('cvLink',inputCV.value)}
                        ref={node=> inputCV = node}/>

                    <label htmlFor="name">Link to my website</label>
                    <input
                        placeholder="Link to my website"
                        className="form-control mb-3"
                        value={this.state.website}
                        onChange={()=>this.onChange('website',inputWebsite.value)}
                        ref={node=> inputWebsite = node}/>
                    <hr/>
                    <h3>Background</h3>
                    <label htmlFor="name">Education</label>
                    <textarea
                        placeholder="Self Description"
                        className="form-control mb-3"
                        value={this.state.education}
                        onChange={()=>this.onChange('education',inputEdu.value)}
                        ref={node=> inputEdu = node}/>

                    <label htmlFor="name">Experience</label>
                    <textarea
                        placeholder="experience"
                        className="form-control mb-3"
                        value={this.state.experience}
                        onChange={()=>this.onChange('experience',inputExp.value)}
                        ref={node=> inputExp = node}/>

                    <label htmlFor="name">Skills</label>
                    <textarea
                        placeholder="skills"
                        className="form-control mb-3"
                        value={this.state.skills}
                        onChange={()=>this.onChange('skills',inputSkill.value)}
                        ref={node=> inputSkill = node}/>


                    <label htmlFor="name">Awards</label>
                    <textarea
                        placeholder="Awards"
                        className="form-control mb-3"
                        value={this.state.awards}
                        onChange={()=>this.onChange('awards',inputAwards.value)}
                        ref={node=> inputAwards = node}/>

                    <label htmlFor="name">Publications</label>
                    <textarea
                        placeholder="Publications"
                        className="form-control mb-3"
                        value={this.state.publications}
                        onChange={()=>this.onChange('publications',inputPub.value)}
                        ref={node=> inputPub = node}/>


                    <label htmlFor="name">Languages</label>
                    <textarea
                        placeholder="Languages"
                        className="form-control mb-3"
                        value={this.state.languages}
                        onChange={()=>this.onChange('languages',inputLanguages.value)}
                        ref={node=> inputLanguages = node}/>
                    <hr/>

                    <h3>Basic Information</h3>
                    <label htmlFor="name">email</label>
                    <input
                        placeholder="email"
                        className="form-control mb-3"
                        value={this.state.email}
                        onChange={()=>this.onChange('email',inputEmail.value)}
                        ref={node=> inputEmail = node}/>

                    <label htmlFor="name">phone</label>
                    <input
                        placeholder="phone"
                        className="form-control mb-3"
                        value={this.state.phone}
                        onChange={()=>this.onChange('phone',inputPhone.value)}
                        ref={node=> inputPhone = node}/>

                    <label htmlFor="name">address</label>
                    <input
                        placeholder="address"
                        className="form-control mb-3"
                        value={this.state.address}
                        onChange={()=>this.onChange('address',inputAddress.value)}
                        ref={node=> inputAddress = node}/>

                    <label htmlFor="name">Date of Birth</label>
                    <input
                        placeholder="Date of Birth"
                        className="form-control mb-3"
                        value={this.state.dob}
                        onChange={()=>this.onChange('dob',inputDOB.value)}
                        ref={node=> inputDOB = node}/>
                    <hr/>
                    
                    <button 
                      className="btn btn-success"
                      onClick={()=>{this.handleSaveButton()}}>
                      Save
                    </button>
                    &nbsp;
                    <Link to = {`/me`} className="btn btn-primary">Return to dashboard</Link>
                    &nbsp;
                    <button
                      className="btn btn-danger"
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



const ApplicantProfileContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(ApplicantProfile)

export default ApplicantProfileContainer;