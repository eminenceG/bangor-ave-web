let _singleton = Symbol();

const API_KEY = process.env.REACT_APP_AUTHORIZATION_KEY.split("_BANGOR_")[1];
const NEWS_URL = 'https://newsapi.org/v2/everything?q=KEYWORD&apiKey=' + API_KEY;

class NewsServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new NewsServiceClient(_singleton);
        return this[_singleton];
    }

    getNews(keyword) {
        return fetch(NEWS_URL.replace('KEYWORD', keyword))
            .then(response => response.json());
    }


}


export default NewsServiceClient;