import React from 'react'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux';
import NavLinkBar from '../navlink/navlink'
import AuthRouteContainer from '../../components/auth-route/auth-route'
function HR(){
    return <h2>HR front page</h2>
}

function applicant(){
    return <h2>applicant front page</h2>
}

function Msg(){
    return <h2>Msg front page</h2>
}

function User(){
    return <h2>User front page</h2>
}


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:''
        };
    }

    render(){

        const user = this.props.userReducer;
        const {pathname} = this.props.location;
        const navList = [
            {
                path:'/hr',
                text:'applicant',
                icon:'HR',
                title:'Applicants list',
                component: HR,
                hide: user.status !== 'HR'
            },
            {
                path:'/applicant',
                text:'HR',
                icon:'job',
                title:'HR list',
                component: applicant,
                hide: user.status !== 'applicant'
            },
            {
                path:'/msg',
                text:'message',
                icon:'msg',
                title:'message list',
                component: Msg,
                hide: false
            },
            {
                path:'/me',
                text:'me',
                icon:'user',
                title:'Self center',
                component: User,
                hide: false
            }
        ]




        return (
            <div>
                <AuthRouteContainer></AuthRouteContainer>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top box-shadow">
                    <div className="container-fluid d-flex justify-content-between">
                        <div className="navbar-header">
                            <a className="navbar-brand align-items-center d-flex" href="/home">{navList.find(v=>v.path === pathname).title}</a>
                        </div>
                        <div className=" collapse navbar-collapse col-sm-9" id="myNavbar">
                            <NavLinkBar data = {navList} ></NavLinkBar>
                        </div>

                        <button className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-2 collapsed"
                                type="button" data-toggle="collapse" data-target="#myNavbar"
                                aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"
                                 focusable="false"><title>Menu</title>
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path>
                            </svg>
                        </button>
                    </div>
                </nav>
                <br/>
                <br/>
                <h2>content</h2>

            </div>
        )
    }

}

const stateToPropertiesMapper = (state) =>(
    state
)
const dispatcherToPropsMapper = dispatch =>({
})

const DashboardContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(Dashboard)

export default DashboardContainer;