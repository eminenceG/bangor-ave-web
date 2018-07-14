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
                    <a href = {this.props.job.PositionURI}>
                        {this.props.job.PositionTitle}
                    </a>

                </td>
                <td>{this.props.job.OrganizationName}</td>
                <td>{this.props.job.PositionLocation[0].LocationName}</td>
                <td>{this.props.job.PositionRemuneration[0].MinimumRange}~{this.props.job.PositionRemuneration[0].MaximumRange}</td>

            </tr>
            // this title will be converted into a link
        )


    }
}

export default JobRow;