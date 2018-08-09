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

export class User extends Component {
  render() {
    return (
      <div className="card container">
        <div className="content">
          <div className="author">
            <center>
            <a href="#pablo">
              <img
                className="avatar border-gray"
                style={{width: '180px'}}
                src={require(`../img/${this.props.userReducer.avatar}.png`)}
                alt="..."
              />
              <h4 className="title">
                {this.props.userReducer.user}
                <br />
                <small>{this.props.userReducer.title}</small>
              </h4>
            </a>
            </center>
          </div>
          <p className="description text-center">{this.props.userReducer.desc}</p>
        </div>
        <hr />
        <div className="text-center">
          <div>
            <Button simple>
              <i className="fa fa-facebook-square" />
            </Button>
            <Button simple>
              <i className="fa fa-twitter" />
            </Button>
            <Button simple>
              <i className="fa fa-google-plus-square" />
            </Button>
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
})

const UserContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(User)

export default UserContainer;