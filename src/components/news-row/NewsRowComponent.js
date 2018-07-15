import React from 'react'


export default class NewsRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const article = this.props.article;
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