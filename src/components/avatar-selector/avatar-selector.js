import React from 'react';
import './avatar.css';
import PropTypes from 'prop-types'

const avatarList = 'boy,businessman,businessman2,businessman3,children,classic,girl,goodBoy,hacker,man,pirate,scientist,teacher,young'
    .split(',')
    .map(v=>({
        icon: require(`../img/${v}.png`),
        text: v
    }));


class AvatarSelector extends React.Component{
    static propTypes = { //property type check.
    // If wrong param is passed in or no param is passed in to this component, it will report error.
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            text: null,
            icon: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({text: nextProps.avatar})
        avatarList.forEach(item => {
            if(item.text === nextProps.avatar){
                this.setState({icon: item.icon});
            }
        });
    }

    render(){
        const gridHeader = this.state.text
                            ? (<div>
                                    <span>{`Your avatar is: `}</span>
                                    <img src = {this.state.icon} style={{width: 50}} alt=""/>
                                </div>)
                            :(<div>Please select your avatar</div>);
        return(
            <div>
                {gridHeader}
                <br/>
                <div className="container">
                    <div className="row">
                        {avatarList?avatarList.map(d=>(
                            <div key={d.text} className="col">
                                <img
                                    src={d.icon}
                                    className="img"
                                    alt=""
                                    onClick={() => {
                                        this.setState(d);
                                        this.props.selectAvatar(d.text);
                                    }}/>
                            </div>
                        )):null}
                    </div>
                </div>

            </div>
        )

    }
}




export default AvatarSelector;