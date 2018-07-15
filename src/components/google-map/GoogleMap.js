import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const API_KEY = process.env.REACT_APP_AUTHORIZATION_KEY.split("_BANGOR_")[2];

const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'red',
        background: 'yellow',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)',
        opacity: '0.5'
    }}>
        {text}
    </div>
);

class SimpleMap extends Component {
    constructor(props){
        super(props);
        this.state={
            center: {
                lat: this.props.lat,
                lng: this.props.lon
            },
            zoom: 12
        }
    }



    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '50%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    <AnyReactComponent
                        lat={this.props.lat}
                        lng={this.props.lon}
                        text={this.props.name}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;