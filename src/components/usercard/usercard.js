import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  };

    constructor(props){
        super(props);
        this.state = {

        };

    }


  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.userlist?this.props.userlist.map(v=>(
            v.avatar?
                <div className="card"  key={v.user}>
                    <div className="row">
                        <div className="col-4">
                            <img className="card-img-top" style={{width: '180px'}} src={require(`../img/${v.avatar}.png`)} alt="Card image cap"/>
                        </div>
                        <div className="col-6">
                            <div className="card-body">
                                <Link to={`/chat/${v._id}`}><h5 className="card-title">{v.user}</h5></Link>
                                <p className="card-text">{v.title}</p>
                                <div className="card-text">{v.posDesc?v.posDesc.split('\n').map(d=>(<div key={d}>{d}</div>)):null}</div>
                                {v.status=='HR'?<p className="card-text">Salary: {v.money}</p>:null}
                                {v.status=='HR'?<p className="card-text">Company: {v.company}</p>:null}
                            </div>
                        </div>
                        {this.props.userReducer.status==='admin'?
                        <div className="col-2">
                            <a className="btn btn-primary"
                                    href="#top"
                                    onClick={()=>{this.props.handleEdit(v)}}>edit</a>
                            &nbsp;
                            <a className="btn btn-danger"
                                style={{color:"white"}}
                               onClick={()=>{this.props.handleDelete(v)}}>delete</a>
                        </div>:null}
                        <div className="col-2">
                        {!v.isFriend&&(this.props.userReducer.status==='applicant'||this.props.userReducer.status==='HR')?
                            <a className="btn btn-primary"
                               style={{color:"white"}}
                               onClick={()=>{this.props.handleConnect(v)}}>connect</a>
                               :null}
                        {v.isFriend&&(this.props.userReducer.status==='applicant'||this.props.userReducer.status==='HR')?
                            <a className="btn btn-danger"
                                  style={{color:"white"}}
                                  onClick={()=>{this.props.handleDisConnect(v)}}>disconnect</a>
                                  :null}
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

// const dispatcherToPropsMapper = dispatch =>({
//
// })



const UserCardContainer = connect(stateToPropertiesMapper,null)(UserCard)


export default UserCardContainer;