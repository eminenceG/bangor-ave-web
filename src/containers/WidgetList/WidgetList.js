import React from 'react'
import JobServiceClient from '../../services/JobServiceClient'
import WidgetRow from '../../components/widget/Widget'


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
        console.log('getting data');

        this.jobService.getJobs(this.state.jobId)
            .then(res => {
                this.setState({ job : res.SearchResult.SearchResultItems[0] });
                console.log(this.state);
            });

        // this.setState({job: fakeData.SearchResult.SearchResultItems[0]});
    }

    render(){
        let contentKey = this.state.job?Object.keys(this.state.job.MatchedObjectDescriptor):null;
        console.log(contentKey);


        return(
            <div className="container">
                <h1>Job Detail</h1>

                <ul className="list-group">
                    {contentKey?contentKey.map(item=>(
                        <WidgetRow key={item} title={item} value={this.state.job.MatchedObjectDescriptor[item]}/>)):null}
                </ul>
            </div>
        )
    }

}

export default WidgetList;