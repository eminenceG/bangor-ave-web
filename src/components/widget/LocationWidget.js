import React from 'react';
import {Link} from 'react-router-dom'

class LocationWidget extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="card mb-3 list-group-item">
                <h1 style={{color:'#046b99'}}>Location</h1>
                <br/>
                <h3>{this.props.data.PositionLocationDisplay}</h3>
            </div>
        )
    }
}

export default LocationWidget;