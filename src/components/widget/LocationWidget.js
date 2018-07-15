import React from 'react';
import SimpleMap from '../google-map/GoogleMap'

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
                <SimpleMap lat={this.props.data.PositionLocation[0].Latitude} lon={this.props.data.PositionLocation[0].Longitude} name={this.props.data.PositionLocation[0].LocationName}/>

            </div>
        )
    }
}

export default LocationWidget;