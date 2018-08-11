import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";   
import {Link} from 'react-router-dom';
import UserCard from '../usercard/usercard';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'
import CompanyServiceClient from "../../services/CompanyServiceClient";




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

    this.onChange = this.onChange.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.companyService = CompanyServiceClient.instance;

  } 
  handleSubmitButton() {
    console.log("Submit Button Clicked");
    let company = {
      companyName: this.props.userReducer.company,
      companyDescription: this.state.companyDescription,
      companyImg: this.state.companyImg,
      companyState: this.state.companyState,
      companyCity: this.state.companyCity,
      companyAddress: this.state.companyAddress
    };
    console.log(company);
    this.companyService
        .updateCompany(company)
        .then(() => console.log('Finish Update Company Information'));
  }

  componentDidMount(){
    //   this.props.getUserList('applicant');
  }

  onChange(key, val){
    this.setState({
        [key]:val
    })
}

  render(){
    // console.log(this.props);
    let inputElemImgURL;
    let inputElemCompanyState;
    let inputElemCompanyCity;
    let inputElemCompanyAddress;
    let inputElemCompanyDescription
    return (
      <div className="container">
        <h2>{this.props.userReducer.company}</h2>
        <form>
          <FieldGroup
            id="formControlsImgURL"
            type="text"
            label="Image URL"
            placeholder="Image URL"
            inputRef={input => inputElemImgURL = input}
            onChange={()=>this.onChange('companyImg', inputElemImgURL.value)}
          />
          <FieldGroup
            id="formControlsCompanyState"
            type="text"
            label="State"
            placeholder="Company State"
            inputRef={input => inputElemCompanyState = input}
            onChange={()=>this.onChange('companyState', inputElemCompanyState.value)}
          />
          <FieldGroup
            id="formControlsCompanyCity"
            type="text"
            label="City"
            placeholder="Company City"
            inputRef={input => inputElemCompanyCity = input}
            onChange={()=>this.onChange('companyCity', inputElemCompanyCity.value)}
          />
          <FieldGroup
            id="formControlsCompanyAddress"
            type="text"
            label="Address"
            placeholder="Company Address"
            inputRef={input => inputElemCompanyAddress = input}
            onChange={()=>this.onChange('companyAddress', inputElemCompanyAddress.value)}
          />

          <FormGroup controlId="formControlsCompanyDescription">
            <ControlLabel>Company Description</ControlLabel>
            <FormControl 
              componentClass="textarea" 
              placeholder="Company description"
              inputRef={input => inputElemCompanyDescription = input}
              onChange={()=>this.onChange('companyDescription', inputElemCompanyDescription .value)}
            />
          </FormGroup>
          <Button
            onClick={this.handleSubmitButton}
            type="button">Submit</Button>
        </form>
      </div>
    // <div className="container">
    //   <h2>{this.props.userReducer.company}</h2>
    //   <br/>
    //   <input
    //       placeholder="Company Name"
    //       className="form-control mb-3"
    //       value={this.state.company}
    //       onChange={()=>this.onChange('company', inputElemComp.value)}
    //       ref={node=> inputElemComp = node}/>
  
    //   <textarea
    //       placeholder="Company Description"
    //       className="form-control mb-3"
    //       value={this.state.desc}
    //       onChange={()=>this.onChange('desc', inputElemPosDesc.value)}
    //       ref={node=> inputElemPosDesc = node}/>
      
    //   <input
    //     placeholder="Company Image URL"
    //     className="form-control mb-3"
    //     value={this.state.companyImg}
    //     onChange={()=>this.onChange('companyImg', inputElemImg.value)}
    //     ref={node=> inputElemImg = node}/>
  
  
    //   <button className="btn btn-primary"
    //           onClick={this.handleSubmit}>
    //       Save
    //   </button>
    //   <button
    //       style={{marginLeft: 20}}
    //       className="btn btn-danger"
    //       onClick={this.logout}
    //   >
    //     Logout
    //   </button>
    // </div>
    )  
  }

}

const stateToPropertiesMapper = (state) =>(
    state
);

const dispatcherToPropsMapper = dispatch =>({
});


export default connect(stateToPropertiesMapper,dispatcherToPropsMapper)(CompanyEditor)