let _singleton = Symbol();
const HOST=`https://data.usajobs.gov/api/search?JobCategoryCode=2210&ResultsPerPage=10`;


class JobServiceClient {
    constructor(singletonToken){
        if(_singleton !== singletonToken) throw new Error('Cannot instantiate directly');
    }
    static get instance(){
        if(!this[_singleton]) this[_singleton] = new JobServiceClient(_singleton);
        return this[_singleton];
    }

    getJobs(){
        return fetch(HOST, {
            headers:{
                "User-Agent": "lincolnhuj@gmail.com",
                "Authorization-Key": process.env.REACT_APP_AUTHORIZATION_KEY,
                "Host": "data.usajobs.gov",
                "Cache-Control": "no-cache"
            }
        }).then(function(response){
                return response.json();
            });

    }

    // getJobs(){
    //     return fakeData;
    // }

}
export default JobServiceClient;