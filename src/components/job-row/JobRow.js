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
                    <Link to = {'#'}>
                        {this.props.job.position_title}
                    </Link>

                </td>
                <td>{this.props.job.organization_name}</td>
                <td>{this.props.job.locations}</td>

            </tr>
            // this title will be converted into a link
        )


    }
}

export default JobRow;