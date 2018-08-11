import React from 'react'
import LocalJobServiceClient from '../../services/LocalJobServiceClient'
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from "../../actions";

class LocalJob extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };

        this.jobService = LocalJobServiceClient.instance;
        this.findAllJobs = this.findAllJobs.bind(this);
        this.renderJobList = this.renderJobList.bind(this);
    }

    componentDidMount() {
        this.findAllJobs();
    }


    findAllJobs(hrId) {
        return this.jobService.findAllJobs(hrId)
            .then(jobs => this.setState({jobs: jobs}))
    }

    renderJobList() {
        return this.state.jobs.map(
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
    render() {
        return(
            <div className="container">
                <h2 style={{textAlign: 'center'}}>Job Cards</h2>
                {this.renderJobList()}
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



const LocalJobContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(LocalJob);

export default LocalJobContainer;