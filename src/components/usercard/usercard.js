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
            showDetail: null
        };

    }

    renderApplicant(user){
        return(
            <div>
                {user.cvLink?<div><a className="description text-center" href={'https://'+user.cvLink}>Resume</a><br/></div>:null}
                {user.website?<div><a className="description text-center" href={'https://'+user.website}>My Website</a></div>:null}
                <br/>


                <hr/>
                <h5 htmlFor="name">Education</h5>
                <p>{user.education?user.education.split('\n').map(item=>(<li key={item}>{item}</li>)):null}</p>
                <hr/>
                <h5 htmlFor="name">Experience</h5>
                <p>{user.experience?user.experience.split('\n').map(item=>(<li key={item}>{item}</li>)):null}</p>
                <hr/>
                <h5 htmlFor="name">Skills</h5>
                <p>{user.skills?user.skills.split('\n').map(item=>(<li key={item}>{item}</li>)):null}</p>
                <hr/>
                <h5 htmlFor="name">Awards</h5>
                <p>{user.awards?user.awards.split('\n').map(item=>(<li key={item}>{item}</li>)):null}</p>
                <hr/>
                <h5 htmlFor="name">Publications</h5>
                <p>{user.publications?user.publications.split('\n').map(item=>(<li key={item}>{item}</li>)):null}</p>
                <hr/>
                <h5 htmlFor="name">Languages</h5>
                <p>{user.languages?user.languages.split('\n').map(item=>(<li key={item}>{item}</li>)):null}</p>
                <hr/>
            </div>
        )
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
                                <h4>{v.user}</h4>
                                {!this.props.userReducer.status==='HR'&&this.props.page==='applications'?<p className="card-text">{v.title}</p>:null}
                                {v.status==='applicant'?<div>
                                    <p>Target position: {v.title}</p>
                                    <p>{v.desc?v.desc.split('\n').map(item=>(<li key={item}>{item}</li>)):null}</p>


                                </div>:null}
                                <div className="card-text">{v.posDesc?v.posDesc.split('\n').map(d=>(<div key={d}>{d}</div>)):null}</div>
                                {v.status=='HR'?<p className="card-text">Salary: {v.money}</p>:null}
                                {v.status=='HR'?<p className="card-text">Company: {v.company}</p>:null}
                                {this.props.userReducer.status==='HR'&&this.props.page==='applications'?
                                    <div>
                                        <h4>Applying job</h4>
                                        <p>{v.job.name}</p>
                                    </div>
                                        :null}

                                {this.state.showDetail===v.user?this.renderApplicant(v):null}
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
                        {this.state.showDetail===v.user?<button className="btn btn-primary"
                                                                style={{color:"white", marginTop: 20}}
                                                                onClick={()=>{this.setState({showDetail: null})}}>Hide Detail</button>
                                                                :
                                                                <button className="btn btn-success"
                                                                 style={{color:"white", marginTop: 20}}
                                                                 onClick={()=>{this.setState({showDetail: v.user})}}>View Detail</button>}
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