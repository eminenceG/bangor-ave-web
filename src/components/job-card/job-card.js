import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class JobCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jobList:[]
        };

    }

    componentDidMount(){
        let jobList;
        if(this.props.applicationlist){
            jobList = this.props.applicationlist.map(application => (application.job));
        }
        this.setState({jobList: jobList})

    }

    componentWillReceiveProps(newProps){
        let jobList;
        if(newProps.applicationlist){
            jobList = newProps.applicationlist.map(application => (application.job));
        }
        this.setState({jobList: jobList})
    }


    render() {
        return (
            <div>
                {this.state.jobList?this.state.jobList.map(v=>(
                        <div className="card"  key={v._id}>
                            <div className="row">
                                <div className="col-4">
                                    <img className="card-img-top" style={{width: '180px'}} src={v.company.companyImg} alt="Card image cap"/>
                                </div>
                                <div className="col-6">
                                    <div className="card-body">
                                        <h1>Job title: {v.name}</h1>
                                        <p>Company name: {v.company.companyName}</p>
                                        <p>Job description: {v.description}</p>
                                        <p>Company Location: {v.location}</p>
                                        <p>Salary: {v.salary}</p>
                                    </div>
                                </div>

                                </div>
                            </div>
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



const JobCardContainer = connect(stateToPropertiesMapper,null)(JobCard)


export default JobCardContainer;