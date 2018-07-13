import React from 'react';
import {Link} from 'react-router-dom'



class JobRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <tr>
                <td>
                    <a href = {this.props.job.url}>
                        {this.props.job.position_title}
                    </a>

                </td>
                <td>{this.props.job.organization_name}</td>
                <td>{this.props.job.locations}</td>
                <td>{this.props.job.minimum}~{this.props.job.maximum}</td>

            </tr>
            // this title will be converted into a link
        )


    }
}

export default JobRow;