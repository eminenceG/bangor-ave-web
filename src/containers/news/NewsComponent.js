import React from 'react';
import NewsServiceClient from "../../services/NewsServiceClient";
import NewsRowComponent from "../../components/news-row/NewsRowComponent";


export default class NewsComponent extends React.Component{

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
    //
    // componentWillReceiveProps(newProps){
    //     console.log(newProps.keyword);
    //     if(newProps.keyword === this.props.keyword) {
    //         return;
    //     }
    //
    //     this.findNewsByKeyword()
    // }

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


        //make keyword more accurate
        let escapeParenthesis = this.props.keyword.split('(')[0];
        if(escapeParenthesis.length === 0) escapeParenthesis = this.props.keyword;
        escapeParenthesis = escapeParenthesis.split('/')[0];
        if(escapeParenthesis.length === 0) escapeParenthesis = this.props.keyword;

        let keywords = escapeParenthesis.split(" ");
        let keyword = '';

        for(let i = keywords.length - 1; i >= 0; i--) {
            if(keywords[i].length < 2) continue;
            keyword = keywords[i] + " " + keyword;
            if(keyword.split(" ").length >= 2) break;
        }
        console.log('keyword: ', keyword, keywords);
        if(keyword.length === 0) keyword = 'jobs';

        this.newsService
            .getNews(keyword)
            .then(news => {

                // get the top five article
                let articles = news.articles;
                if(!articles || !this.props.keyword) return [];


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

                this.setState({articles : finalArticles});
            })
    }


    render() {
        return(
            <div>
                {this.renderNewsList()}
            </div>
        )
    }



}