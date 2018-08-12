import * as constants from "../constants";

let _singleton = Symbol();
export default class LocalJobServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) throw new Error('Cannot instantiate directly');
    }

    static get instance() {
        if (!this[_singleton]) this[_singleton] = new LocalJobServiceClient(_singleton);
        return this[_singleton];
    }

    createJob(job) {
        // console.log(job);
        return fetch(constants.HOST + '/api/job', {
            method: 'post',
            body: JSON.stringify(job),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(
            response => response.json()
        )
    }

    deleteJob(jobId) {
        return fetch(constants.HOST + '/api/job/' + jobId, {
            method: 'delete'
        }).then(response => response.json());
    }

    findAllJobs() {
        return fetch(constants.HOST + '/api/job',{
            credentials: 'include'

        })
            .then(response => response.json());
    }


    findJobsForHR(hrId) {
        return fetch(constants.HOST + '/api/job/hr/' + hrId)
            .then(response => response.json())
    }

    updateJob(job) {
        return fetch(constants.HOST + '/api/job', {
            method: 'put',
            body: JSON.stringify(job),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(
            response => response.json()
        )
    }

    findJobByName(name) {
        return fetch(constants.HOST + '/api/job/search/' + name)
            .then(response => response.json());
    }




}