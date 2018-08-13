import React from 'react'
import * as actions from "../../actions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import LocalJobServiceClient from "../../services/LocalJobServiceClient";

class AdminJobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            hrId: '',
            location: '',
            description: '',
            name: '',
            salary: '',
            hideEditor: true,
            jobs: []
        };

        this.jobService = LocalJobServiceClient.instance;
        this.findAllJobs = this.findAllJobs.bind(this);
        this.renderJobList = this.renderJobList.bind(this);
        this.handleDeleteJob = this.handleDeleteJob.bind(this);
    }

    componentDidMount() {
        this.findAllJobs();
    }


    findAllJobs(hrId) {
        return this.jobService.findAllJobs(hrId)
            .then(jobs => this.setState({jobs: jobs}))
    }

    handleDeleteJob(jobId) {
        this.jobService.deleteJob(jobId)
            .then(() => {
                this.findAllJobs();
                alert('Job deleted successfully');
            })
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
                        <div style={{marginBottom: 10, marginRight: 10}}>
                            <button style={{marginLeft: 10}} onClick={() => this.handleDeleteJob(job._id) }
                                    className="float-right btn btn-danger">
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    this.setState(job, () => {
                                        this.setState({company: job.company.companyName})
                                    });
                                    this.setState({hideEditor: false});
                                    window.scrollTo(0, 0);
                                }}
                                className="float-right btn btn-primary">
                                Edit This Job
                            </button>
                        </div>
                    </div>
                )
            }
        )
    }

    render() {
        return (
            <div className='container'>

                <h3 style={{textAlign: 'center'}}>As an admin, you can delete and edit jobs posted by other users in this website</h3>
                <hr/>
                <form style={{marginTop: 30}} hidden={this.state.hideEditor}>

                    <h3 style={{textAlign: 'center'}}>Job Editor</h3>
                    <div className="form-group">
                        <label htmlFor="nameEdit">Job Name</label>
                        <input type="text"
                               value={this.state.name}
                               className="form-control"
                               id="nameEdit"
                               onChange={event => this.setState({name: event.target.value})}
                               placeholder="Job Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="locationEdit">Location</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.location}
                               id="locationEdit"
                               onChange={event => this.setState({location: event.target.value})}
                               placeholder="Location"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="SalaryEdit">Salary</label>
                        <input type="text"
                               className="form-control"
                               id="SalaryEdit"
                               value={this.state.salary}
                               onChange={event => this.setState({salary: event.target.value})}
                               placeholder="Salary"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptionEdit">Description</label>
                        <textarea className="form-control"
                                  id="descriptionEdit"
                                  value={this.state.description}
                                  onChange={event => {
                                      this.setState({description: event.target.value});
                                  }} rows="3"/>
                    </div>
                    <button type="button"
                            onClick={() => {
                                console.log(this.state);
                                this.jobService.updateJob(this.state)
                                    .then(() => {
                                        this.findAllJobs();
                                        alert('Job updated successfully')
                                    });
                                this.setState({hideEditor: true})
                            }}
                            className="btn btn-success">
                        Update job
                    </button>

                    <button style={{marginLeft: 10}}
                            type="button"
                            onClick={() => this.setState({hideEditor: true})}
                            className="btn btn-danger">
                        Cancel and hide the editor
                    </button>
                </form>




                <div style={{marginTop: 30}}>
                    {this.renderJobList()}
                </div>




            </div>

        )
    }
}

const stateToPropertiesMapper = (state) =>(
    state.userReducer
);

const dispatcherToPropsMapper = dispatch =>({

});



const AdminJobListContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(AdminJobList);

export default AdminJobListContainer;