let _singleton = Symbol();
const HOST=`https://data.usajobs.gov/api/search?`;
const API_KEY = process.env.REACT_APP_AUTHORIZATION_KEY.split("_BANGOR_")[0];

class JobServiceClient {
    constructor(singletonToken){
        if(_singleton !== singletonToken) throw new Error('Cannot instantiate directly');
    }
    static get instance(){
        if(!this[_singleton]) this[_singleton] = new JobServiceClient(_singleton);
        return this[_singleton];
    }

    getJobs(keyword){
        console.log(keyword);
        return fetch(HOST + 'Keyword=' + keyword, {
            headers:{
                "User-Agent": "lincolnhuj@gmail.com",
                "Authorization-Key": API_KEY,
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