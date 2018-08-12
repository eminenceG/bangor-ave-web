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
    return (
      <div>
        {this.props.userlist?this.props.userlist.map(v=>(
            v.avatar?
                <div className="card"  key={v.job?(v.job.name+v.user):v.user}>
                    <div className="row">
                        <div className="col-4">
                            <div>
                                <img className="card-img-top"
                                     style={{width: '180px'}}
                                     src={require(`../img/${v.avatar}.png`)}
                                     alt="Card image cap"/>
                            </div>
                            <div>
                                <Link to={`/chat/${v._id}`} >
                                    <button style={{marginTop: 20, marginBottom: 20, width: '180px'}}
                                            className="btn btn-block btn-dark">
                                        Chat
                                    </button>
                                </Link>
                            </div>

                        </div>
                        <div className="col-6">
                            <div className="card-body">
                                <h4>Name</h4>
                                <p>{v.user}</p>
                                {!this.props.userReducer.status=='HR'&&this.props.page==='applications'?<p className="card-text">{v.title}</p>:null}
                                <div className="card-text">{v.posDesc?v.posDesc.split('\n').map(d=>(<div key={d}>{d}</div>)):null}</div>
                                {v.status=='HR'?<p className="card-text">Salary: {v.money}</p>:null}
                                {v.status=='HR'?<p className="card-text">Company: {v.company}</p>:null}
                                {this.props.userReducer.status=='HR'&&this.props.page==='applications'?
                                    <div>
                                        <h4>Applying job</h4>
                                        <p>{v.job.name}</p>
                                    </div>
                                        :null}
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
                        {!v.isFriend&&this.props.page!=='friendlist'&&(this.props.userReducer.status==='applicant'||(this.props.userReducer.status==='HR'&&this.props.page!=='applications'))?
                            <a className="btn btn-primary"
                               style={{color:"white"}}
                               onClick={()=>{this.props.handleConnect(v)}}>connect</a>
                               :null}
                        {v.isFriend&&(this.props.userReducer.status==='applicant'||this.props.userReducer.status==='HR')||this.props.page==='friendlist'?
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