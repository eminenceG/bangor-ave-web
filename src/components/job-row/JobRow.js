import React from 'react';
import {Link} from 'react-router-dom'



class JobRow extends React.Component{
    render(){
        return (
            <tr>
                <td>
                    <Link to = {`/job/detail/${this.props.job.PositionID}`}>
                        {this.props.job.PositionTitle}
                    </Link>

                </td>
                <td>{this.props.job.OrganizationName}</td>
                <td>{this.props.job.PositionLocation[0].LocationName}</td>
                <td>${this.props.job.PositionRemuneration[0].MinimumRange}~{this.props.job.PositionRemuneration[0].MaximumRange} / {this.props.job.PositionRemuneration[0].RateIntervalCode}</td>

            </tr>
        )


    }
}

export default JobRow;