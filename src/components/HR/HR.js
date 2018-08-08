import React from 'react'
import axios from 'axios'
import * as constants from "../../constants";

class HR extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }


    componentDidMount(){
        axios(constants.HOST + '/user/list?status=applicant',{
            withCredentials: true
        }).then(res=>{
            if(res.data.code === 0){
                this.setState({
                    data: res.data.data
                })
            }
        })

    }

    render(){
        return (
            <div className="container">
                <h2>HR front page</h2>
                {this.state.data.map(v=>(
                    v.avatar?
                    <div className="card"  key={v.user}>
                    <div className="row">
                        <div className="col-4">
                            <img className="card-img-top" style={{width: '200px'}} src={require(`../img/${v.avatar}.png`)} alt="Card image cap"/>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">{v.user}</h5>
                                <p className="card-text">{v.title}</p>
                                <div className="card-text">{v.desc.split('\n').map(v=>(<div key={v}>{v}</div>))}</div>
                            </div>
                        </div>
                    </div>
                    </div>:null
                ))}
            </div>
        )

    }

}

export default HR