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
                                    <div className="card-body row">
                                        <div className="col-6">
                                            <h3>Job title</h3>
                                            <p>{v.name}</p>
                                            <h3>Company name</h3>
                                            <p>{v.company.companyName}</p>
                                            <h3>Job description</h3>
                                            {v.description?v.description.split('\n').map(d=>(
                                                <p key={d}>{d}</p>
                                            )):null}
                                        </div>
                                        <div className="col-6">
                                            <h3>Company Location</h3>
                                            <p>{v.location}</p>
                                            <h3>Salary</h3>
                                            <p>{v.salary}</p>
                                        </div>


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