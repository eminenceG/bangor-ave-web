import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";   
import {Link} from 'react-router-dom';
import UserCard from '../usercard/usercard';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'
import CompanyServiceClient from "../../services/CompanyServiceClient";
import { Redirect } from 'react-router-dom';

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
        companyImg: '',
        companyState: '',
        companyCity: '',
        companyAddress: '',
        companyDescription: '' 
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.companyService = CompanyServiceClient.instance;

  } 

  handleSubmitButton() {
    // console.log("Submit Button Clicked");
    let company = {
      companyName: this.props.userReducer.company,
      companyDescription: this.state.companyDescription,
      companyImg: this.state.companyImg,
      companyState: this.state.companyState,
      companyCity: this.state.companyCity,
      companyAddress: this.state.companyAddress
    };
    // console.log(company);
    this.companyService
        .updateCompany(company)
        .then(() => alert("Update the company information successfully!"));
  }

  handleDeleteButton() {
    console.log("delete");
    this.companyService
        .deleteCompanyByName(this.props.userReducer.company)
        .then(()=>{
            window.location.reload();
        })
  }

  componentDidMount(){
    //   this.props.getUserList('applicant');
    // console.log(this.props.userReducer.company);
    this.companyService
        .findCompanyByName(this.props.userReducer.company)
        .then(company => {
            if(company === null){
                this.props.history.push('/CompanyManager-profile');
            return;}
          let newState = {
            companyImg:         company.companyImg?company.companyImg:'',
            companyState:       company.companyState?company.companyState:'',
            companyCity:        company.companyCity?company.companyCity:'',
            companyAddress:     company.companyAddress?company.companyAddress:'',
            companyDescription: company.companyDescription?company.companyDescription:''
          }
            this.setState(newState)

          });
  }

  componentWillReceiveProps(newProps) {
    if(this.props === newProps) return;

    // this.setState({
    //     company: newProps.company,
    //     hrId: newProps._id
    // });

    this.companyService
        .findCompanyByName(newProps.userReducer.company)
        .then(company => {
            if(company === null){
                newProps.history.push('/CompanyManager-profile');
                return;
            }
          let newState = {
            companyImg:         company.companyImg?company.companyImg:'',
            companyState:       company.companyState?company.companyState:'',
            companyCity:        company.companyCity?company.companyCity:'',
            companyAddress:     company.companyAddress?company.companyAddress:'',
            companyDescription: company.companyDescription?company.companyDescription:''
          }
          this.setState(newState)
          });

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
        {this.props.userReducer.redirectTo&&this.props.userReducer.redirectTo!==this.props.location.pathname? <Redirect to = {this.props.userReducer.redirectTo}/>:null}
        <h2>{this.props.userReducer.company}</h2>
        <form>
          <FieldGroup
            id="formControlsImgURL"
            type="text"
            label="Image URL"
            placeholder="Image URL"
            value={this.state.companyImg}
            inputRef={input => inputElemImgURL = input}
            onChange={()=>this.onChange('companyImg', inputElemImgURL.value)}
          />
          <FieldGroup
            id="formControlsCompanyState"
            type="text"
            label="State"
            placeholder="Company State"
            value={this.state.companyState}
            inputRef={input => inputElemCompanyState = input}
            onChange={()=>this.onChange('companyState', inputElemCompanyState.value)}
          />
          <FieldGroup
            id="formControlsCompanyCity"
            type="text"
            label="City"
            placeholder="Company City"
            value={this.state.companyCity}
            inputRef={input => inputElemCompanyCity = input}
            onChange={()=>this.onChange('companyCity', inputElemCompanyCity.value)}
          />
          <FieldGroup
            id="formControlsCompanyAddress"
            type="text"
            label="Address"
            placeholder="Company Address"
            value={this.state.companyAddress}
            inputRef={input => inputElemCompanyAddress = input}
            onChange={()=>this.onChange('companyAddress', inputElemCompanyAddress.value)}
          />

          <FormGroup controlId="formControlsCompanyDescription">
            <ControlLabel>Company Description</ControlLabel>
            <FormControl 
              componentClass="textarea" 
              placeholder="Company description"
              value={this.state.companyDescription}
              inputRef={input => inputElemCompanyDescription = input}
              onChange={()=>this.onChange('companyDescription', inputElemCompanyDescription .value)}
            />
          </FormGroup>

          <Button
            block
            bsStyle="success"
            onClick={this.handleSubmitButton}
            type="button">Submit
          </Button>

          {/*<Button*/}
            {/*block*/}
            {/*bsStyle="danger"*/}
            {/*onClick={this.handleDeleteButton}*/}
            {/*type="button">Delete*/}
          {/*</Button>*/}
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