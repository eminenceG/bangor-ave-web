import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";   
import {Link} from 'react-router-dom';
import UserCard from '../usercard/usercard';


class CompanyEditor extends React.Component{
  constructor(props){
      super(props);
      this.state={
          data:[]
      }
  }  

  componentDidMount(){
    //   this.props.getUserList('applicant');
  }

  render(){
    return (
      <div className="container">
        <h2>Company Editor</h2>
      </div>
    )  
  }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
})


export default connect(stateToPropertiesMapper,dispatcherToPropsMapper)(CompanyEditor)