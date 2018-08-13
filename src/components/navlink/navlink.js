import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class NavLinkBar extends React.Component{
    static propTypes = { // data must be an array
        data: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            navList:[]
        };
    }

    componentDidMount(){
        const navList = this.props.data.filter(i => {
            return i.hide === false;
        }); // hide unrelated data.
        this.setState({
            navList: navList
        })
    }

    componentWillReceiveProps(nextProps){
        const navList = nextProps.data.filter(i => {
            return i.hide === false;
        }); // hide unrelated data.
        this.setState({
            navList: navList
        })

    }

    renderListOfNavTabs(){
        let tabs = this.state.navList.map(tab => {
            let selected=null;
            console.log(tab);
            if(tab.path === window.location.pathname){
                selected="active"
            }
            return (
                <li className={"nav-item"} style={{backgroundColor: "#666", marginRight: "5px", fontSize:'12px'}} key={tab.title}>
                    <span className={`nav-link ${selected}`} >
                        <Link to = {`${tab.path}`} style={{color: selected==='active'?'black':"#FFF"}}>
                            {tab.title}
                        </Link>
                    </span>
                </li>
            )
        });
        return tabs;
    }


    render(){
        return(
            <div>
                <div className="container">
                    <form className="input-group form-inline my-2 my-lg-0">
                        <ul className="list-group">
                            <ul className="nav nav-tabs ">
                                {this.renderListOfNavTabs()}
                            </ul>
                        </ul>
                    </form>
                </div>
            </div>
        )
    }
}

export default NavLinkBar