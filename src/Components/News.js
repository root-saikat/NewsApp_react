import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

    capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state ={
            articles: [],
            page: 1,
            loading: false
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Top-News`;
    }

    async updateNews(){
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults, 
            loading: false})  
    }

    async componentDidMount() { 
        this.updateNews();
    }

    handlePrevClick = async ()=>{
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }
    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    render() {
        return (
        <div className="container my-5">
            <h3 className='text-center'>Top-News - {this.capitalizeFirstLetter(this.props.category)} Top Headlines</h3>
            {this.state.loading && <Spinner/>}
            <div className="row mt-5">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4 col-6 d-flex justify-content-center" key={element.url}>
                        <Newsitem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,88):""} imgurl={element.urlToImage} newsurl={element.url} date={element.publishedAt} author={element.author}/>
                    </div>
                })}
            </div>
            <div className='d-flex justify-content-between mt-5'>
                <button disabled={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
        )
    }    
}
