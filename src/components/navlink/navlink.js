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
            return (
                <li className={"nav-item"} style={{backgroundColor: "#666", marginRight: "5px"}} key={tab.title}>
                    <span className={`nav-link ${tab.text}`} >
                        <Link to = {`${tab.path}`} style={{color: "#FFF"}}>
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
                            <ul className="nav nav-tabs">
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