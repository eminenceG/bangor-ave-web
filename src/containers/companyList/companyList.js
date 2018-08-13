import React from 'react'
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from "../../actions";
import CompanyServiceClient from "../../services/CompanyServiceClient";
import LocalJobServiceClient from "../../services/LocalJobServiceClient"

class JobList extends React.Component {
  // get the company name
  constructor(props) {
    super(props);

    this.renderJobList = this.renderJobList.bind(this);
  }

  renderJobList() {
    // console.log(this.state);
    return this.props.jobs.map(
        job => {
            return (
                <div style={{marginTop: 20, marginBottom: 20}}
                     key={job._id}
                     className="border border-dark card text-center">
                    <div className="card-header">
                        <h5 className="card-title">Job Position: {job.name}</h5>
                    </div>
                    <div className="card-header">
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
                    </div>
                </div>
            )
        }
    )
  }

  render () {
    return (
      <div hidden={this.props.hidden}>
        {this.renderJobList()}
      </div>
    )
  }
}


class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideJobList: true,
      jobs: []
    }

    this.handleSeeJobsButton = this.handleSeeJobsButton.bind(this);
    this.LocalJobServiceClient = LocalJobServiceClient.instance

  }

  handleSeeJobsButton() {
    // TODO: Click this button to render job list for this company
    // this.LocalJobServiceClient
    //     .findJobsByCompany(this.props.company)
    // alert("not supported now");
    console.log("see jobs of " + this.props.company.companyName);
    // console.log(this.LocalJobServiceClient)
    this.LocalJobServiceClient
        .findJobByCompanyId(this.props.company._id)
        .then( jobs => {
          this.setState({hideJobList: !this.state.hideJobList})
          this.setState({jobs: jobs})
          console.log(this.state)
        })

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
          className="card-img-top center"
          src={this.props.company.companyImg} 
          alt="Card image cap"/>
        <div className="card-header">
          <h3 className="card-title">{this.props.company.companyName}</h3>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{this.props.company.companyState}</li>
          <li className="list-group-item">{this.props.company.companyCity}</li>
          <li className="list-group-item">{this.props.company.companyAddress}</li>
        </ul>
        <div className="card-body">
            <p className="card-text">{this.props.company.companyDescription}</p>
          <button 
            onClick={this.handleSeeJobsButton}
            className='btn btn-primary'>See Jobs</button>
        </div>
        <JobList
          hidden={this.state.hideJobList}
          jobs={this.state.jobs}
        />
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
            // console.log(company)
            this.setState({company: company})})
    }

    renderCompanyList() {
      // console.log(this.state);
      return this.state.company.map(
        company => {
            return (
              <CompanyRow
                company={company} 
                key={company._id}/>
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