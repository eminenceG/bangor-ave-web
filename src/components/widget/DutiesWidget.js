import React from 'react';

class DutiesWidget extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="mb-3 list-group-item">
                <h1 style={{color:'#046b99'}}>Duties</h1>
                <h3>Summary</h3>
                <p>{this.props.data.UserArea.Details.JobSummary}</p>
                <br/>
            </div>
        )
    }
}

export default DutiesWidget;