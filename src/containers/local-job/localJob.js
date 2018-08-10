import React from 'react'
import LocalJobServiceClient from '../../services/LocalJobServiceClient'

export default class LocalJob extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };

        this.localJobService = LocalJobServiceClient.instance;
    }

    componentDidMount() {
        this.localJobService.findAllJobs()
            .then(jobs => this.setState({jobs : jobs}));
    }

    render() {
        return(
            <div className="container">
                <h2>Job List</h2>
                <ul className="list-group">
                    {this.state.jobs.map(
                        job => {
                            return (
                                 <li key={job._id}
                                     className="list-group-item">
                                    {job.name}
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>




        )
    }


}
