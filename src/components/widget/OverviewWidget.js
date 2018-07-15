import React from 'react';

class OverviewWidget extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="card mb-3 list-group-item">
                <h1 style={{color:'#046b99'}}>Overview</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h3>Open & closing dates</h3>
                            <p>{this.props.data.PositionStartDate} to {this.props.data.PositionEndDate}</p>
                            <br/>
                            <h3>Pay scale & grade</h3>
                            <p>{this.props.data.JobGrade[0].Code} {this.props.data.UserArea.Details.LowGrade}</p>

                            <br/>
                            <h3>Appointment type</h3>
                            <p>{this.props.data.PositionOfferingType[0].Name}</p>
                        </div>
                        <div className="col-6">
                            <h3>Salary</h3>
                            <p>${this.props.data.PositionRemuneration[0].MinimumRange} to ${this.props.data.PositionRemuneration[0].MinimumRange} {this.props.data.PositionRemuneration[0].RateIntervalCode}</p>

                            <br/>

                            <h3>Work schedule</h3>
                            <p>{this.props.data.PositionSchedule[0].Name}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OverviewWidget;