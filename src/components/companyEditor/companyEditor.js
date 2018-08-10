import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";   
import {Link} from 'react-router-dom';
import UserCard from '../usercard/usercard';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
  

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
    console.log(this.props);
    return (
      <div className="container">
        <h2>{this.props.userReducer.company}</h2>
        <form>
          <FieldGroup
            id="formControlsImgURL"
            type="text"
            label="Image URL"
            placeholder="Image URL"
          />
          <FieldGroup
            id="formControlsCompanyState"
            type="text"
            label="State"
            placeholder="Company State"
          />
          <FieldGroup
            id="formControlsCompanyCity"
            type="text"
            label="City"
            placeholder="Company City"
          />
          <FieldGroup
            id="formControlsCompanyAddress"
            type="text"
            label="Address"
            placeholder="Company Address"
          />
          <FormGroup controlId="formControlsCompanyDescription">
            <ControlLabel>Company Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Company description" />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
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