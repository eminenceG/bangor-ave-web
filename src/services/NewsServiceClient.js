let _singleton = Symbol();

const NEWS = 'https://newsapi.org/v2/everything?q=KEYWORD&apiKey=c5204ccbccdf4decb919161f77721ac9';

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

    getTweets(keyword) {
        console.log(NEWS.replace('KEYWORD', keyword));
        return fetch(NEWS.replace('KEYWORD', keyword))
            .then(response => response.json());
    }


}


export default NewsServiceClient;