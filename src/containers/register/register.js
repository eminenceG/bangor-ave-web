import React from 'react'
import Logo from '../../components/logo/logo'



class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'applicant'
        };
        this.register = this.register.bind(this);

    }

    register(){
        this.props.history.push('/register')
    }

    render(){
        return (
            <div>
                <Logo></Logo>
                <div className="container">
                    <h2>Register</h2>

                    <div>
                        <input
                            placeholder="Username"
                            className="form-control mb-3"
                            value={null}
                            onChange={null}
                            ref={null}/>
                        <input
                            placeholder="Password"
                            className="form-control mb-3"
                            value={null}
                            onChange={null}
                            ref={null}/>
                        <input
                            placeholder="Confirmed Password"
                            className="form-control mb-3"
                            value={null}
                            onChange={null}
                            ref={null}/>
                    </div>

                    <select
                        className="form-control mb-3"
                        value={this.state.status}
                        onChange={null}
                        ref={null}>
                        <option disabled="disabled">Choose status</option>
                        <option value="Applicant">Applicant</option>
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                        <option value="CompanyManager">CompanyManager</option>
                    </select>

                    <button
                        onClick={this.register}
                        className="btn btn-primary"
                        style={{marginRight: "5px"}}>Register</button>
                </div>
            </div>
        )
    }

}

export default Register;