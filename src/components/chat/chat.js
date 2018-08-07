import React from 'react'
import io from 'socket.io-client'
import * as constants from "../../constants";


export default class Chat extends React.Component {

    componentDidMount() {
        const socket = io(constants.HOST);
    }

    render() {
        return(
            <h1>Chat {this.props.match.params.user}</h1>
        )
    }
}