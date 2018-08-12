import React, { Component } from 'react';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import { connect } from 'react-redux'
// only pass state.user to register, so that other field will be updated to
// register only when they are changed in the input field.
import {loading} from '../../config/config'
class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        // console.log(loading);
        document.body.style = 'background: white;';
        return (
            <LoadingOverlay style={{ width: "100%", height: "100%", backgroundColor: 'papayawhip' }}>
                <h2 style={{ margin: 16}}>{`  `}</h2>
                <Loader loading={loading}/>
            </LoadingOverlay>
        )
    }

}

const stateToPropertiesMapper = (state) =>(
    state
);


const LoadingContainer = connect(stateToPropertiesMapper,null)(Loading);

export default LoadingContainer;