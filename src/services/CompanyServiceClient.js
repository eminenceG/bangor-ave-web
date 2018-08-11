import * as constants from "../constants";

let _singleton = Symbol();
export default class CompanyServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) throw new Error('Cannot instantiate directly');
    }

    static get instance() {
        if (!this[_singleton]) this[_singleton] = new CompanyServiceClient(_singleton);
        return this[_singleton];
    }

    createCompany(companyName) {
        const company = {companyName: companyName};
        return fetch(constants.HOST + '/api/company', {
            method: 'post',
            body: JSON.stringify(company),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(
            response => response.json()
        )
    }




}
