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
                    return <JobRow job={job}/>
                }
            );
        }

        return jobs
    }



    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="/jobs">Job List</a>

                    <form className="input-group form-inline my-2 my-lg-0">
                        <input onChange={null} className="form-control mr-sm-2" id="titleFld" placeholder="search job"/>
                        <button className="btn btn-outline-danger my-2 my-sm-0" type="button">search</button>
                    </form>

                </nav>



                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>position_title</th>
                        <th>organization_name</th>
                        <th>locations</th>
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