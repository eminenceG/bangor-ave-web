import React from 'react';
import NewsServiceClient from "../../services/NewsServiceClient";
import NewsRowComponent from "../../components/news-row/NewsRowComponent";


export default class NewsPage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            articles: []
        };
        this.newsService = NewsServiceClient.instance;
        this.findNewsByKeyword = this.findNewsByKeyword.bind(this);
        this.renderNewsList = this.renderNewsList.bind(this);
    }

    componentDidMount() {
        this.findNewsByKeyword()
    }

    componentWillReceiveProps(newProps){
        console.log(newProps.keyword);
        if(newProps.keyword === this.props.keyword) {
            return;
        }

        this.findNewsByKeyword()
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

        const keyword = this.props.match.params.keyword;
        console.log(keyword);

        this.newsService
            .getNews(keyword)
            .then(news => {
                // get the top five article
                let articles = news.articles;
                if(!articles || !this.props.match.params.keyword) return [];


                let filterByImage = articles.filter(article => article.urlToImage && article.description);
                filterByImage.sort((a, b) => b.description.length - a.description.length);

                let finalArticles = [];
                for(let i = 0; i < filterByImage.length; i++) {
                    finalArticles.push(filterByImage[i]);
                    if(finalArticles.length >= 5)
                        break;
                }

                if(finalArticles.length < 3) {
                    finalArticles = articles;
                }

                this.setState({articles : finalArticles}, () => console.log(articles));
            })
    }


    render() {
        return(
            <div className="container" style={{marginBottom: 100}}>
                <h2 style={{textAlign: 'center'}}>News List</h2>

                <button
                    style={{marginTop: 50, marginBottom: 50, lineHeight: 10, textTransform: 10}}
                    onClick={() => this.props.history.goBack()}
                    className="btn btn-dark btn-block">
                    Go Back
                </button>

                {this.renderNewsList()}
            </div>
        )
    }



}