import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    Grid,
    Row,
    Col,
    Button,
    FormGroup,
    ControlLabel,
    FormControl
  } from "react-bootstrap";

import { Link } from 'react-router-dom';
import AuthRouteContainer from '../../components/auth-route/auth-route'
import { Redirect } from 'react-router-dom';
import * as actions from "../../actions";

export class User extends Component {

  constructor(props) {
    
    super(props);


    this.handleEditProfileButtonClick = this.handleEditProfileButtonClick.bind(this);
  }

  componentDidMount() {
  }

  handleEditProfileButtonClick() {
    console.log('handleEditProfileButtonClick()');
    
  }

  renderHR(){
    return(
        <div>
            <h4 className="title">
                {this.props.userReducer.user}
                <br />
                <small>{this.props.userReducer.status} from {this.props.userReducer.company}</small>
                <br />
                <small>Hiring position: {this.props.userReducer.title}</small>
                <br />
            </h4>
            <p className="description text-center">{this.props.userReducer.desc}</p>
            <button
                className="btn btn-primary"
                onClick={()=>{
                    this.props.changeRedirectTo('/' + this.props.userReducer.status + '-profile');
                    this.props.history.push('/' + this.props.userReducer.status + '-profile');
                }}
            >
                Edit My Profile
            </button>
        </div>
    )
  }

  renderApplicant(){
      return(
          <div>
              <h4 className="title description text-center">
                  {this.props.userReducer.user}
                  <br />
                  <small>{this.props.userReducer.status}</small>
                  <br />
                  <small>Target position: {this.props.userReducer.title}</small>
                  <br />
              </h4>
              <p className="description text-center">{this.props.userReducer.desc}</p>
              <center>
                  <a className="description text-center" href={'https://'+this.props.userReducer.cvLink}>Resume</a>
                  <br/>
                  <a className="description text-center" href={'https://'+this.props.userReducer.website}>My Website</a>
                  <br/>
              </center>

              <hr/>
              <h3>Background</h3>
              <h5 htmlFor="name">Education</h5>
              <p>{this.props.userReducer.education?this.props.userReducer.education.split('\n').map(item=>(<li>{item}</li>)):null}</p>
              <h5 htmlFor="name">Experience</h5>
              <p>{this.props.userReducer.experience?this.props.userReducer.experience.split('\n').map(item=>(<li>{item}</li>)):null}</p>
              <h5 htmlFor="name">Skills</h5>
              <p>{this.props.userReducer.skills?this.props.userReducer.skills.split('\n').map(item=>(<li>{item}</li>)):null}</p>
              <h5 htmlFor="name">Awards</h5>
              <p>{this.props.userReducer.awards?this.props.userReducer.awards.split('\n').map(item=>(<li>{item}</li>)):null}</p>
              <h5 htmlFor="name">Publications</h5>
              <p>{this.props.userReducer.publications?this.props.userReducer.publications.split('\n').map(item=>(<li>{item}</li>)):null}</p>
              <h5 htmlFor="name">Languages</h5>
              <p>{this.props.userReducer.languages?this.props.userReducer.languages.split('\n').map(item=>(<li>{item}</li>)):null}</p>


              <button
                  className="btn btn-primary"
                  onClick={()=>{
                    this.props.changeRedirectTo('/' + this.props.userReducer.status + '-profile');
                      this.props.history.push('/' + this.props.userReducer.status + '-profile');
                  }}
                  >
                  Edit My Profile
              </button>
          </div>
      )
  }

  renderRepresentative(){
      return(
          <div>
              <h4 className="title">
                  {this.props.userReducer.user}
                  <br />
                  <small>Customer Representative</small>
                  <br />
              </h4>
              {/*<p className="description text-center">{this.props.userReducer.desc}</p>*/}
          </div>
      )
  }

  renderCompanyManager(){
      return(
          <div>
              <h4 className="title">
                  {this.props.userReducer.user}
                  <br />
                  <small>Company Manager of {this.props.userReducer.company}</small>
                  <br />
              </h4>
              <p className="description text-center">{this.props.userReducer.desc}</p>
              {/*<button*/}
                  {/*className="btn btn-primary"*/}
                  {/*onClick={()=>{*/}
                      {/*this.props.changeRedirectTo('/' + this.props.userReducer.status + '-profile');*/}
                      {/*this.props.history.push('/' + this.props.userReducer.status + '-profile');*/}
                  {/*}}*/}
              {/*>*/}
                  {/*Edit My Profile*/}
              {/*</button>*/}
          </div>
      )
  }


  render() {
    return (
      <div className="card container">
          <AuthRouteContainer/>
          {this.props.userReducer.redirectTo&&this.props.userReducer.redirectTo=='/login'? <Redirect to = {this.props.userReducer.redirectTo}/>:null}
          {this.props.userReducer.avatar?<div className="content">
              <div className="author">
                  <center>
                      <img
                          className="avatar border-gray"
                          style={{width: '180px'}}
                          src={require(`../img/${this.props.userReducer.avatar}.png`)}
                          alt="..."
                      />
                  </center>
                      {this.props.userReducer.status==='HR'?this.renderHR():null}
                      {this.props.userReducer.status==='applicant'?this.renderApplicant():null}
                      {this.props.userReducer.status==='representative'?this.renderRepresentative():null}
                      {this.props.userReducer.status==='CompanyManager'?this.renderCompanyManager():null}

              </div>
          </div>:null}
        <hr />

        <div className="text-center">
          <div>
            {/*<Button simple>*/}
              {/*<i className="fa fa-facebook-square" />*/}
            {/*</Button>*/}
            {/*<Button simple>*/}
              {/*<i className="fa fa-twitter" />*/}
            {/*</Button>*/}
            {/*<Button simple>*/}
              {/*<i className="fa fa-google-plus-square" />*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    );
  }
}


const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    changeRedirectTo: (target) => actions.changeRedirectTo(dispatch, target)
})

const UserContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(User)

export default UserContainer;