import React from 'react';
import NewsServiceClient from "../../services/NewsServiceClient";
import NewsRowComponent from "../../components/news-row/NewsRowComponent";


export default class NewsComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            articles: []
        };
        this.newsService = NewsServiceClient.instance;
        this.inputChanged = this.inputChanged.bind(this);
        this.findNewsByKeyword = this.findNewsByKeyword.bind(this);
        this.renderNewsList = this.renderNewsList.bind(this);
    }

    componentDidMount() {

    }


    renderNewsList() {
        return this.state.articles.map(
            (article, index) => {
                return(
                    <NewsRowComponent key={index} article={article}/>
                )
            }
        )
    }

    findNewsByKeyword() {
        this.newsService
            .getTweets(this.state.keyword)
            .then(news => this.setState({articles: news.articles}))
    }

    inputChanged(event) {
        this.setState({keyword: event.target.value})
    }

    render() {
        return(
            <div>
                <div className="input-group">
                    <input type="text"
                           className="form-control"
                           placeholder="Recipient's username"
                           onChange={this.inputChanged}
                    />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary"
                                    onClick={this.findNewsByKeyword}
                                    type="button">
                                Button
                            </button>
                        </div>
                </div>

                <ul className="list-group">
                    {this.renderNewsList()}
                </ul>



            </div>



        )
    }



}