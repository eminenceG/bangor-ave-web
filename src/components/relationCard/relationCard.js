import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class RelationCard extends React.Component {
    static propTypes = {
        friendshipList: PropTypes.array.isRequired
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
                <div>
                    <img className="card-img-top"
                         style={{width: '180px'}}
                         src={require(`../img/${user.avatar}.png`)}
                         alt="Card image cap"/>
                </div>
                <h4>{user.user}</h4>
            </div>
        )
    }


    render() {
        let cnt=0;
        return (
            <div>
                {this.props.friendshipList?this.props.friendshipList.map(fs=>(
                    fs.me.avatar&&fs.friend.avatar?
                        <div key={cnt++}>
                            <div className="row">
                                <div className="card  col-5">
                                    {this.renderApplicant(fs.me)}
                                </div>
                                <div >
                                    <button className="btn btn-danger" onClick={()=>{this.props.handleDisConnect(fs)}}>disconnect</button>
                                </div>
                                <div className="card  col-5">
                                    {this.renderApplicant(fs.friend)}
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



const RelationCardContainer = connect(stateToPropertiesMapper,null)(RelationCard)


export default RelationCardContainer;