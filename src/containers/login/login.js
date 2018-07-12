import React from 'react'
import Logo from '../../components/logo/logo'
class Login extends React.Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login(){
        this.props.history.push('/login')
    }
    register(){
        this.props.history.push('/register')
    }

    render(){
        return(
            <div>
                <Logo></Logo>
                <div className="container">
                    <h2>Login</h2>

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
                    </div>


                    <button
                        onClick={this.login}
                        className="btn btn-primary" style={{marginRight: "5px"}}>Login</button>

                    <button
                        onClick={this.register}
                        className="btn btn-primary"
                        style={{marginRight: "5px"}}>Register</button>
                </div>
            </div>
        )
    }

}

export default Login;