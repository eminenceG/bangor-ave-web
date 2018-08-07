import React from 'react'
import io from 'socket.io-client'
import * as constants from "../../constants";
const socket = io(constants.HOST);

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: '123',
            message: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        socket.emit('sendmsg', {text: this.state.textInput});
        this.setState({textInput: ''});
    }

    componentDidMount() {
        socket.on('receiveMessage', (data) => {
            this.setState({
                message: [
                    ...this.state.message,
                    data.text
                ]
            });

        });
    }

    render() {
        return(
            <div className="container">
                <div>
                    {this.state.message.map(
                        message => {
                            return(
                                <p key={message}>
                                    {message}
                                </p>
                            )
                        }
                    )}
                </div>

                <div className="stick-footer container">
                    <div className="input-group mb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="message"
                               value={this.state.textInput}
                               onChange={event => {
                                   this.setState({textInput:  event.target.value})
                               }}
                               aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.handleSubmit()}
                                        type="button" id="button-addon2">
                                    Send
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}