import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import {Link} from 'react-router-dom';

class HR extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('applicant');
    }

    render(){
        return (
            <div className="container">
                <h2>HR front page</h2>
                {this.props.chatUser.userList?this.props.chatUser.userList.map(v=>(
                    v.avatar?
                    <div className="card"  key={v.user}>
                    <div className="row">
                        <div className="col-4">
                            <img className="card-img-top" style={{width: '200px'}} src={require(`../img/${v.avatar}.png`)} alt="Card image cap"/>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <Link to={`/chat/${v._id}`}><h5 className="card-title">{v.user}</h5></Link>
                                <p className="card-text">{v.title}</p>
                                <div className="card-text">{v.desc?v.desc.split('\n').map(v=>(<div key={v}>{v}</div>)):null}</div>
                            </div>
                        </div>
                    </div>
                    </div>:null
                )):null}
            </div>
        )

    }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    getUserList: (userInfo) => actions.getUserList(dispatch, userInfo)

})



const HRContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(HR)

export default HRContainer;