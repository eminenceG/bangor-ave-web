import React from 'react'
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from "../../actions";
import CompanyServiceClient from "../../services/CompanyServiceClient";


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
                <div style={{marginTop: 20, marginBottom: 20}}
                     key={company._id}
                     className="border border-dark card text-center">
                    <div className="card-header">
                        <h5 className="card-title">Company: {company.companyName}</h5>
                    </div>
                    {/* <div className="card-header">
                        <div>
                            Company: {job.company.companyName}
                        </div>
                        <div>
                            <Link to={'/news/' + job.company.companyName}>
                                click to view news about this company
                            </Link>
                        </div>  
                    </div>
                    <div className="card-header">
                        Salary: {job.salary}
                    </div>
                    <div className="card-header">
                        <div>
                            Location: {job.location}
                        </div>
                        <div>
                            <Link to={'/news/' + job.location}>
                                click to view news about this location
                            </Link>
                        </div>  
                    </div>
                    <div className="card-body">
                        <p className="card-text">Job Description: {job.description}</p>
                    </div> */}
                </div>
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