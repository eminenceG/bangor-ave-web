let _singleton = Symbol();
const HOST=`https://jobs.search.gov/jobs/search.json?query=nursing+jobs+in+ny`;

class JobServiceClient {
    constructor(singletonToken){
        if(_singleton !== singletonToken) throw new Error('Cannot instantiate directly');
    }
    static get instance(){
        if(!this[_singleton]) this[_singleton] = new JobServiceClient(_singleton);
        return this[_singleton];
    }

    getJobs(){
        return fetch(HOST)
            .then(function(response){
                return response.json();
            });

    }

}
export default JobServiceClient;