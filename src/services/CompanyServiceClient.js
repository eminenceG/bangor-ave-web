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

    createCompany(company) {


        console.log(company);
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

    updateCompany(company) {
        return fetch(constants.HOST + '/api/company', {
            method: 'put',
            body: JSON.stringify(company),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(
            response => response.json()
        )
    }

    findCompanyByName(companyName) {
      return fetch(constants.HOST + '/api/company/' + companyName)
        .then(response => response.json());
    }

    findAllCompany() {
      return fetch(constants.HOST + '/api/company')
        .then(response => response.json());
    }

    deleteCompanyByName(companyName) {
      return fetch(constants.HOST + '/api/company/' + companyName, {
          method: 'delete'
      }).then(response => response.json());
    }
}
