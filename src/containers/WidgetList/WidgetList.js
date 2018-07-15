import React from 'react'
import JobServiceClient from '../../services/JobServiceClient'
import OverviewWidget from '../../components/widget/OverviewWidget'
import LocationWidget from '../../components/widget/LocationWidget'
import DutiesWidget from '../../components/widget/DutiesWidget'
import RequirementsWidget from '../../components/widget/RequirementsWidget'
import {Link} from 'react-router-dom'
import NewsComponent from "../news/NewsComponent";



class WidgetList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jobId:this.props.match.params.jobId,
            job:null
        };
        this.jobService = JobServiceClient.instance;
        this.getJobDetailById = this.getJobDetailById.bind(this);
    }

    componentDidMount() {
        this.getJobDetailById();
    }


    getJobDetailById(){
        // console.log('getting data');

        this.jobService.getJobs(this.state.jobId)
            .then(res => {
                this.setState({ job : res.SearchResult.SearchResultItems[0] });
                // console.log(this.state);
            });

        // this.setState({job: fakeData.SearchResult.SearchResultItems[0]});
    }

    render(){
        document.body.style = 'background: white';
        let contentKey = this.state.job?Object.keys(this.state.job.MatchedObjectDescriptor):null;
        // console.log(contentKey);


        return(
            <div style={{position:'absolute', top:'0', width:'100%'}}>
                <div style={{backgroundColor:'#046b99', color:'white', padding:'25px'}}>
                    {contentKey?<h1>{this.state.job.MatchedObjectDescriptor.PositionTitle}</h1>:null}
                    {contentKey?<h5>{this.state.job.MatchedObjectDescriptor.OrganizationName}</h5>:null}
                    {contentKey?<h4>{this.state.job.MatchedObjectDescriptor.DepartmentName}</h4>:null}
                    {contentKey?<button className='btn-dark' style={{top:'8px',left:'90%', position:'absolute'}}><Link to={'/jobs'} style={{color:'white'}}>Go Back</Link></button>:null}
                </div>

                <div className="container">
                    <br/>
                    <ul className="list-group">
                        {contentKey?<OverviewWidget data={this.state.job.MatchedObjectDescriptor}/>:null}
                        {contentKey?<LocationWidget data={this.state.job.MatchedObjectDescriptor}/>:null}
                        {contentKey?<DutiesWidget data={this.state.job.MatchedObjectDescriptor}/>:null}
                        {contentKey?<RequirementsWidget data={this.state.job.MatchedObjectDescriptor}/>:null}

                    </ul>

                    <ul className="list-group" style={{marginTop: 100}}>
                    <li className='list-group-item'>
                        {contentKey?<h1 style={{color:'#046b99'}}>News related to this job location: {this.state.job.MatchedObjectDescriptor.PositionLocation[0].LocationName}</h1>:null}
                    </li>
                    {contentKey?<NewsComponent keyword={this.state.job.MatchedObjectDescriptor.PositionLocation[0].LocationName}/>:null}
                    </ul>
                </div>
            </div>
        )
    }

}

export default WidgetList;