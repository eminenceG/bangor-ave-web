import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        {this.props.userlist?this.props.userlist.map(v=>(
            v.avatar?
                <div className="card"  key={v.user}>
                    <div className="row">
                        <div className="col-4">
                            <img className="card-img-top" style={{width: '180px'}} src={require(`../img/${v.avatar}.png`)} alt="Card image cap"/>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <Link to={`/chat/${v._id}`}><h5 className="card-title">{v.user}</h5></Link>
                                <p className="card-text">{v.title}</p>
                                <div className="card-text">{v.posDesc?v.posDesc.split('\n').map(d=>(<div key={d}>{d}</div>)):null}</div>
                                {v.status=='HR'?<p className="card-text">Salary: {v.money}</p>:null}
                                {v.status=='HR'?<p className="card-text">Company: {v.company}</p>:null}
                            </div>
                        </div>
                    </div>
                </div>:null
        )):null}
      </div>
    )
  }
}

export default UserCard;