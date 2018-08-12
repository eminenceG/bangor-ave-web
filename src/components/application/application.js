import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";
import JobCard from '../job-card/job-card';
import UserCard from '../usercard/usercard';


class Application extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]

        }
    }

    componentDidMount(){
        this.props.findApplicationsForUserLoggedIn();
    }

    renderApplicationsForApplicant(){
        return (
            <div>
                <h2>Jobs Applied</h2>
                    {this.props.applicationReducer.applicationList?
                        <JobCard
                            applicationlist={this.props.applicationReducer.applicationList}
                        ></JobCard>:null}
            </div>
        )
    }

    renderApplicantsForHR(){
        let userList=null;
        if(this.props.applicationReducer.applicationList){
            userList = this.props.applicationReducer.applicationList.map(
            application => (
                 {...application.applicant, job: application.job}
            ))
        }

        return (
            <div>
                <h2>Applicants applying to your jobs</h2>
                {userList?
                    <UserCard
                        userlist={userList} page={'applications'}
                    ></UserCard>:null}
            </div>
        )
    }

    render(){
        // console.log(this.props.applicationReducer.applicationList);
        return (
            <div className="container">
                {this.props.userReducer.status==='applicant'?this.renderApplicationsForApplicant():null}
                {this.props.userReducer.status==='HR'?this.renderApplicantsForHR():null}
            </div>
        )

    }

}

const stateToPropertiesMapper = (state) =>(
    state
)

const dispatcherToPropsMapper = dispatch =>({
    findApplicationsForUserLoggedIn: () => actions.findApplicationsForUserLoggedIn(dispatch)
})



const ApplicationContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Application);

export default ApplicationContainer;