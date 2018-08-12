import React from 'react'
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'

class Home extends React.Component{

    render(){
        document.body.style = 'background: black;';
        return(
            <div className='background'>
                {this.props.redirectTo&&this.props.userReducer.redirectTo!==this.props.location.pathname? <Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
                    <div className="card bg-light mb-6" style={{maxWidth: '18rem'}}>
                        <div className="card-header"><strong>Mini Linkedin</strong></div>
                        <div className="card-body">
                            <Link to = {`/jobs`} style={{color:'white'}}>
                                <button style={{marginBottom: 20}} className="btn btn-block btn-info">
                                    start searching jobs
                                </button>
                            </Link>
                            <Link to = {`/login`} style={{color:'white'}}>
                                <button style={{marginBottom: 20}} className="btn btn-block btn-success">
                                    login
                                </button>
                            </Link>
                            <Link to = {`/register`} style={{color:'white'}}>
                                <button style={{marginBottom: 20}} className="btn btn-block btn-primary">
                                    register
                            </button>
                            </Link>
                            <Link to = {`/noUser/jobList`} style={{color:'white'}}>
                                <button className="btn btn-block btn-dark">
                                    anonymous user
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <span style={{textAlign: 'center', fontSize: 30}}>
                    <p style={{fontFamily: 'cursive', marginTop: 50}}>
                        Welcome to Mini Linkedin
                    </p>
                </span>

                <span style={{textAlign: 'center', fontSize: 30}}>
                    <p style={{fontFamily: 'cursive'}}>
                        Here you can find your <strong><em>POSITION</em></strong> in the <strong><em>REAL</em></strong> industry
                    </p>
                </span>
            </div>
        )
    }

}

export default Home;