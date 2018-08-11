import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../actions";
import AuthRouteContainer from '../../components/auth-route/auth-route'
import LocalJobServiceClient from "../../services/LocalJobServiceClient";

class HrJob extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            company: '',
            hrId: '',
            location: '',
            description: '',
            name: '',
            salary: '',
            hideCreator: true,
            hideEditor: true,
            jobs: []
        };

        this.jobService = LocalJobServiceClient.instance;
        this.createNewJob = this.createNewJob.bind(this);
        this.findJobsForHR = this.findJobsForHR.bind(this);
        this.handleDeleteJob = this.handleDeleteJob.bind(this);
    }


    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        if(this.props === newProps) return;

        this.setState({
            company: newProps.company,
            hrId: newProps._id
        });

        this.findJobsForHR(newProps._id);

    }

    findJobsForHR(hrId) {
        return this.jobService.findJobsForHR(hrId)
            .then(jobs => this.setState({jobs: jobs}))
    }

    createNewJob() {
        this.jobService.createJob(this.state)
            .then(
                () => {
                    this.findJobsForHR(this.props._id)
                        .then(() => alert('Job Created!'));
                    this.setState({hideCreator: !this.state.hideCreator})
                }
            )
    }

    handleDeleteJob(jobId) {
        this.jobService.deleteJob(jobId)
            .then(() => {
                alert('Job deleted successfully');
                this.findJobsForHR(this.props._id)
            })
    }

    renderJobList() {
        return this.state.jobs.map(
            job => {
                return (
                    <div style={{marginTop: 20}}
                         key={job._id}
                         className="border border-dark card text-center">
                        <div className="card-header">
                            <h5 className="card-title">Job Position: {job.name}</h5>
                        </div>
                        <div className="card-header">
                            Salary: {job.salary}
                        </div>
                        <div className="card-header">
                            Location: {job.location}
                        </div>
                        <div className="card-body">
                            <p className="card-text">Job Description: {job.description}</p>
                            <div>

                                <button style={{marginLeft: 10}} onClick={() => this.handleDeleteJob(job._id) }
                                        className="float-right btn btn-danger">
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        this.setState(job, () => {
                                            this.setState({company: this.props.company})
                                        });
                                        this.setState({hideEditor: false, hideCreator: true});
                                        window.scrollTo(0, 100);
                                    }}
                                    className="float-right btn btn-primary">
                                    Edit This Job
                                </button>
                            </div>
                        </div>

                    </div>
                )
            }
        )
    }

    render() {
        return (
            <div className="container">
                <h2 style={{textAlign: 'center'}}>Company: <em>{this.props.company}</em></h2>
                <hr/>

                {/*create new job*/}
                <button type="button"
                        onClick={() => this.setState({hideCreator: !this.state.hideCreator})}
                        className="btn  btn-block btn-dark">
                    {this.state.hideCreator ? 'Show' : 'Hide'} job Creator
                </button>
                <form style={{marginTop: 30}} hidden={this.state.hideCreator}>
                    <h3 style={{textAlign: 'center'}}>Create new Job</h3>
                    <div className="form-group">
                        <label htmlFor="name">Job Name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               onChange={event => this.setState({name: event.target.value})}
                               placeholder="Job Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text"
                               className="form-control"
                               id="location"
                               onChange={event => this.setState({location: event.target.value})}
                               placeholder="Location"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Salary">Salary</label>
                        <input type="text"
                               className="form-control"
                               id="Salary"
                               onChange={event => this.setState({salary: event.target.value})}
                               placeholder="Salary"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control"
                                  id="description"
                                  onChange={event => {
                                      this.setState({description: event.target.value});
                                  }}
                                  rows="3"/>
                    </div>
                    <button type="button"
                            onClick={this.createNewJob}
                            className="btn btn-block btn-success">Save new job
                    </button>
                </form>
                <hr/>


                {/*update job*/}
                <form style={{marginTop: 30}} hidden={this.state.hideEditor}>
                    <h3 style={{textAlign: 'center'}}>Job Editor</h3>
                    <div className="form-group">
                        <label htmlFor="name">Job Name</label>
                        <input type="text"
                               value={this.state.name}
                               className="form-control"
                               id="name"
                               onChange={event => this.setState({name: event.target.value})}
                               placeholder="Job Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.location}
                               id="location"
                               onChange={event => this.setState({location: event.target.value})}
                               placeholder="Location"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Salary">Salary</label>
                        <input type="text"
                               className="form-control"
                               id="Salary"
                               value={this.state.salary}
                               onChange={event => this.setState({salary: event.target.value})}
                               placeholder="Salary"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control"
                                  id="description"
                                  value={this.state.description}
                                  onChange={event => {
                                      this.setState({description: event.target.value});
                                  }} rows="3"/>
                    </div>
                    <button type="button"
                            onClick={() => {
                                this.jobService.updateJob(this.state)
                                    .then(() => {
                                        this.findJobsForHR(this.props._id);
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


                <h2 style={{textAlign: 'center'}}>Job Cards</h2>
                {this.renderJobList()}
                <hr/>
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



const HrJobContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(HrJob);

export default HrJobContainer;