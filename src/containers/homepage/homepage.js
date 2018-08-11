import React from 'react'
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'

class Home extends React.Component{

    render(){
        document.body.style = 'background: black;';
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <div style={{ display:'flex',alignItems:'center', justifyContent:'center', textAlign:'center' }}>
                    <div className="card bg-light mb-3" style={{maxWidth: '18rem'}}>
                        <div className="card-header">Mini Linkedin</div>
                        <div className="card-body">
                            <button className="btn btn-block btn-danger">
                                <Link to = {`/jobs`} style={{color:'white'}}>
                                    Start searching jobs
                                </Link>
                            </button>
                            <button className="btn btn-block btn-primary">
                                <Link to = {`/login`} style={{color:'white'}}>
                                    login
                                </Link>
                            </button>
                            <button className="btn btn-block btn-success">
                                <Link to = {`/register`} style={{color:'white'}}>
                                    register
                                </Link>
                            </button>
                            <button className="btn btn-block btn-dark">
                                <Link to = {`/noUser/jobList`} style={{color:'white'}}>
                                    anonymous user
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;