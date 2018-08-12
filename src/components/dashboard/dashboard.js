import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux';
import NavLinkBar from '../navlink/navlink'
import AuthRouteContainer from '../../components/auth-route/auth-route'
import HRContainer from '../HR/HR';
import CompanyEditor from '../companyEditor/companyEditor'
import ApplicantContainer from '../applicant/applicant'
import adminContainer from '../admin/admin'
import browserCookie from 'browser-cookies';
import { confirmAlert } from 'react-confirm-alert';
import * as actions from "../../actions";
import { Redirect } from 'react-router-dom';
import UserContainer from "../user/user"
import FriendListContainer from "../friend-list/friend-list"
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import RepresentativeContainer from "../representative/representative";
import HrJobContainer from "../../containers/hr-job/hrJob";
import LocalJobContainer from "../../containers/local-job/localJob";
import CompanyListContainer from '../../containers/companyList/companyList';
import ApplicationContainer from '../../components/application/application';
import SearchLocalJob from "../search-local-job/SearchLocalJob";



class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:''
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (this.props.chatReducer.chatmsg.length !== 0)
            return;
        this.props.getMsgList();
        this.props.recvMsg();
    }



    logout() {
      confirmAlert({
        title: 'Logout',
        message: 'Are you sure to logout?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              browserCookie.erase('userId');
              this.props.logoutSubmit()
            }
          },
          {
            label: 'No',
            onClick: () => console.log('cancel')
          }
        ]
      })
    }

    render(){

        const user = this.props.userReducer;
        const {pathname} = this.props.location;
        const navList = [
            {
                path:'/HR',
                text:'applicant',
                icon:'HR',
                title:'Applicants list',
                component: HRContainer,
                hide: user.status !== 'HR'
            },
            {
                path:'/applicant',
                text:'HR',
                icon:'job',
                title:'HR list',
                component: ApplicantContainer,
                hide: user.status !== 'applicant'
            },
            {
                path:'/admin',
                text:'admin',
                icon:'admin',
                title:'Users list',
                component: adminContainer,
                hide: user.status !== 'admin'
            },
            {
                path:'/me',
                text:'me',
                icon:'user',
                title:'Self center',
                component: UserContainer,
                hide: false
            },
            {
                path:'/CompanyManager',
                text:'CompanyManager',
                icon:'CompanyManager',
                title: 'Company Profile',
                component: CompanyEditor,
                hide: user.status !== 'CompanyManager'
            },
            {
                path: '/representative',
                text: 'representative',
                icon: 'representative',
                title: 'Customer Representative',
                component: RepresentativeContainer,
                hide: true
            },
            {
                path:'/friends',
                text:'Friends',
                icon:'Friends',
                title:'Friends',
                component: FriendListContainer,
                hide: false
            },
            {
                path:'/myJobList/hr',
                text:'My-Job-list',
                icon:'job',
                title:'My-Job-list',
                component: HrJobContainer,
                hide: user.status !== 'HR'
            },
            {
                path:'/jobList',
                text:'Job-list',
                icon:'job',
                title:'Job-list',
                component: LocalJobContainer,
                hide: false
            },
            {
                path:'/company',
                text:'Company',
                icon:'company',
                title:'Company List',
                component: CompanyListContainer,
                hide: false
            },
            {
                path:'/applications',
                text:'applications',
                icon:'applications',
                title:'applications List',
                component: ApplicationContainer,
                hide: false
            },
            {
                path:'/search/localJob',
                text:'Search job',
                icon:'Search',
                title:'Search job',
                component: SearchLocalJob,
                hide: false
            }
        ];





        return (
            <div>
                <AuthRouteContainer/>
                {this.props.userReducer.redirectTo&&this.props.userReducer.redirectTo=='/login'? <Redirect to = {this.props.userReducer.redirectTo}/>:null}
                <nav className="navbar navbar-expand-md fixed-header navbar-dark bg-dark fixed-top box-shadow">
                    <div className="container-fluid d-flex justify-content-between">
                        <div className="navbar-header">
                            <a className="navbar-brand align-items-center d-flex" href="/">{navList.find(v=>v.path === pathname).title}</a>
                        </div>
                        <div className=" collapse navbar-collapse col-sm-9" id="myNavbar">
                            <NavLinkBar data = {navList} />
                        </div>
                        <button className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-2 collapsed"
                                type="button" data-toggle="collapse" data-target="#myNavbar"
                                aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"
                                 focusable="false"><title>Menu</title>
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"/>
                            </svg>
                        </button>
                        {/* TODO: move some buttons to drop down */}
                        <button
                          className="btn btn-primary"
                          onClick={this.logout}>
                          logout
                        </button>
                    </div>
                </nav>
                <br/>
                <br/>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key = {v.path} path = {v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>

            </div>
        )
    }

}

const stateToPropertiesMapper = (state) =>(
    state
);
const dispatcherToPropsMapper = dispatch =>({
    logoutSubmit: () => actions.logoutSubmit(dispatch),
    sendMsg: (send) => sendMsg(dispatch, send),
    getMsgList: () => getMsgList(dispatch),
    recvMsg: () => recvMsg(dispatch)
});

const DashboardContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Dashboard)

export default DashboardContainer;