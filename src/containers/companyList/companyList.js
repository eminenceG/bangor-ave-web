import React from 'react'
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from "../../actions";
import CompanyServiceClient from "../../services/CompanyServiceClient";



class CompanyRow extends React.Component {
  constructor(props) {
    super(props);  
  }
  render () {
    var imgStyle = {
      display: 'block',
      maxWidth: '460px',
      maxHeight: '230px',
      width: 'auto',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    };
    return (
      <div
        style={{marginTop: 20, marginBottom: 20}}
        key={this.props.company._id}
        className="border border-dark card text-center">
        <img

          style={imgStyle}
          class="card-img-top center" 
          src={this.props.company.companyImg} 
          alt="Card image cap"/>
        <div className="card-header">
          <h3 className="card-title">{this.props.company.companyName}</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{this.props.company.companyState}</li>
          <li class="list-group-item">{this.props.company.companyCity}</li>
          <li class="list-group-item">{this.props.company.companyAddress}</li>
        </ul>
        <div class="card-body">
            <p class="card-text">{this.props.company.companyDescription}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
     </div>
    )
  }
}

class CompanyList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            company: []
        };

        this.companyService = CompanyServiceClient.instance;
        this.findAllCompany = this.findAllCompany.bind(this);
        this.renderCompanyList = this.renderCompanyList.bind(this);
    }

    componentDidMount() {
        this.findAllCompany();
    }


    findAllCompany() {
        return this.companyService.findAllCompany()
          .then(company => {
            console.log(company)
            this.setState({company: company})})
    }

    renderCompanyList() {
      console.log(this.state);  
      return this.state.company.map(
        company => {
            return (
              <CompanyRow
                company={company}/>
            )
        }
      )
    }
    render() {
        return(
            <div className="container">
                <h2 style={{textAlign: 'center'}}>Company List</h2>
                {this.renderCompanyList()}
            </div>
        )
    }


}

const stateToPropertiesMapper = (state) =>(
    state.userReducer
);

const dispatcherToPropsMapper = dispatch =>({
    update: (userInfo) => actions.updateProfile(dispatch, userInfo)

});



const CompanyListContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(CompanyList);

export default CompanyListContainer;