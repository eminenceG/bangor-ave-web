import React from 'react'
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'

class Home extends React.Component{

    render(){
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <div style={{ display:'flex',alignItems:'center', justifyContent:'center', textAlign:'center' }}>
                    <div className="card bg-light mb-3" style={{maxWidth: '18rem'}}>
                        <div className="card-header">Mini Linkedin</div>
                        <div className="card-body">
                            <button className="btn btn-danger">
                                <Link to = {`/jobs`} style={{color:'white'}}>
                                    Start searching jobs
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