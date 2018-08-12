import React from 'react'
import { Link } from 'react-router-dom'
import LocalJobServiceClient from "../../services/LocalJobServiceClient";


export default class SearchLocalJob extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            jobs: [],
            keyword: '',
            show: true
        };

        this.findJobByName = this.findJobByName.bind(this);
        this.jobService = LocalJobServiceClient.instance;
        this.renderJobList = this.renderJobList.bind(this);

    }

    findJobByName() {
        this.jobService.findJobByName(this.state.keyword)
            .then(jobs => this.setState({jobs}));
        this.setState({show: true});
    }


    renderJobTitleList() {
        return this.state.jobs.map(
            job => (
                <ul className="list-group">
                    <li className="list-group-item">
                        Job Name: {job.name}
                        <button onClick={() => this.setState({show: false})} className="float-right btn btn-dark">
                            Show Detail
                        </button>
                    </li>

                </ul>
            )
        )
    }

    renderJobList() {
        return this.state.jobs.map(
            job => (
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
        )
    }


    render() {
        return(

            <div style={{marginTop: 20, marginBottom: 20}} className="container">
                <div className="input-group mb-3">
                    <input type="text"
                           onChange={v => this.setState({keyword: v.target.value})}
                           className="form-control"
                           placeholder="Type job name to see jobs posted by users in this website"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary"
                                    onClick={() => this.findJobByName()}
                                    type="button" id="button-addon2">
                                Search
                            </button>
                        </div>
                </div>

                <div hidden={this.state.jobs.length !== 0}
                     style={{marginTop: 40, textAlign: 'center', fontFamily: 'Comic Sans MS'}}>
                    <h3>No job is found :(</h3>
                    <h5 style={{marginTop: 20}}>You can also click the below button to search jobs on the internet</h5>
                    <Link to = {`/jobs`} style={{color:'white'}}>
                        <button style={{marginTop: 20}} className="btn btn-info">
                            Search online jobs
                        </button>
                    </Link>
                </div>

                <div hidden={this.state.jobs.length === 0}  style={{marginTop: 40 }}>
                    <h3 style={{fontFamily: 'Comic Sans MS', textAlign: 'center'}}>
                        Search result
                    </h3>

                    <div  hidden={this.state.show}>
                        {this.renderJobList()}
                    </div>


                    <div hidden={!this.state.show}>
                        {this.renderJobTitleList()}
                    </div>
                </div>





            </div>


        )
    }





}