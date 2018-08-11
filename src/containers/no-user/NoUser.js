import React from 'react'
import {Link} from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
    import LocalJob from '../local-job/localJob'
import CompanyListContainer from "../companyList/companyList";

export default class NoUser extends React.Component {


    constructor(props) {
        super(props);



    }


    render() {
        document.body.style = 'background: white;';
        return(
            <div style={{backgroundColor: 'white'}}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Home Page</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/noUser/jobList">Job List</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/noUser/company">Company List</Link>
                            </li>
                        </ul>
                    </div>
                    <button style={{marginRight: 20}} className="btn btn-primary">
                        <Link to = {`/login`} style={{color:'white'}}>
                            Login
                        </Link>
                    </button>

                    <button  style={{marginRight: 20}} className="btn btn-success">
                        <Link  to = {`/register`} style={{color:'white'}}>
                            Register
                        </Link>
                    </button>
                    <button  style={{marginRight: 20}} className="btn btn-warning">
                        <Link to = {`/jobs`} style={{color:'white'}}>
                            Search online jobs
                        </Link>
                    </button>
                </nav>
            <div style={{marginTop: 30}}>
                <Route path='/noUser/jobList' component={LocalJob}/>
                <Route path='/noUser/company' component={CompanyListContainer}/>
            </div>

            </div>

        )
    }



}