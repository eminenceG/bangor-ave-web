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

    findAllJobs() {
        return fetch(constants.HOST + '/api/job')
            .then(response => response.json());
    }




}