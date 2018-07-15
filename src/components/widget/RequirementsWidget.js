import React from 'react';

class RequirementsWidget extends React.Component{
    render(){
        return (
            <div className="card mb-3 list-group-item">
                <h1 style={{color:'#046b99'}}>Requirements</h1>
                <h3>Qualifications</h3>
                <p>{this.props.data.QualificationSummary}</p>
                <br/>
            </div>
        )
    }
}

export default RequirementsWidget;