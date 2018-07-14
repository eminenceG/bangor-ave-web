import React from 'react';
import {Link} from 'react-router-dom'



class WidgetRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="card list-group-item">
                 {this.props.title}: {JSON.stringify(this.props.value)}
            </div>
            // this title will be converted into a link
        )
    }
}

export default WidgetRow;