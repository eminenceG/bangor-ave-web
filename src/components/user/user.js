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
              <h4 className="title">
                  {this.props.userReducer.user}
                  <br />
                  <small>{this.props.userReducer.status}</small>
                  <br />
                  <small>Applying position: {this.props.userReducer.title}</small>
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

  renderRepresentative(){}

  renderCompanyManager(){}


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
                      {this.props.userReducer.status==='HR'?this.renderHR():null}
                      {this.props.userReducer.status==='applicant'?this.renderApplicant():null}
                      {this.props.userReducer.status==='representative'?this.renderRepresentative():null}
                      {this.props.userReducer.status==='companyManager'?this.renderCompanyManager():null}
                  </center>
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