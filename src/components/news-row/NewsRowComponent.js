import React from 'react'


export default class NewsRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const article = this.props.article;
        if(!article.urlToImage) {
            article.urlToImage = 'https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8812dae86619e2e88fdc7e26d13f0feb&auto=format&fit=crop&w=1650&q=80'
        }
        return(
            <li className='list-group-item'>

                <div className="row">
                    <div className="col-4">
                        <img
                            style={{width: 200}}
                            src={article.urlToImage}/>
                    </div>

                    <div className='col-8'>
                        <h4>Title: {article.title}</h4>
                        <p>date: {article.publishedAt}</p>
                        <p>Description: {article.description}</p>
                        <a href={article.url}>View the original article</a>
                    </div>
                </div>



            </li>
        )


    }


}