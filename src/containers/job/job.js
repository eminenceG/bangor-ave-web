import React from 'react'
import JobServiceClient from '../../services/JobServiceClient'
import JobRow from '../../components/job-row/JobRow'





class Job extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jobs:null
        };
        this.jobService = JobServiceClient.instance;
    }



    componentDidMount() {
        console.log('getting data');
        this.jobService.getJobs()
            .then(jobs => {
                this.setState({ jobs : jobs });
                console.log(this.state);
            })
    }

    renderJobs(){
        let jobs = null;
        if(this.state.jobs){
            jobs = this.state.jobs.map(
                function(job){
                    return <JobRow job={job} key={job.id}/>
                }
            );
        }

        return jobs
    }



    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-md bg-dark fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/jobs" style={{color : "#FFF"}}>Job List</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <form className="input-group form-inline my-2 my-lg-0">
                                <input onChange={null} className="form-control mr-sm-2" id="titleFld" placeholder="search job"/>
                                <button onClick={
                                    null
                                } className="btn btn-danger my-2 my-sm-0" type="button"><i className="fa fa-search"></i></button>
                            </form>
                        </div>

                        <button className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3 collapsed"
                                type="button" data-toggle="collapse" data-target="#myNavbar"
                                aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"
                                 focusable="false"><title>Menu</title>
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path>
                            </svg>
                        </button>

                    </div>
                </nav>

                <h2>Job List</h2>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>position_title</th>
                        <th>organization_name</th>
                        <th>locations</th>
                        <th>salary</th>
                    </tr>
                    <tr>

                    </tr>
                    </thead>
                    <tbody>
                        {this.renderJobs()}
                    </tbody>
                </table>

            </div>
        )
    }

}

export default Job;