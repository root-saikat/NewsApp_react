import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state ={
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Top-News`;
    }

    async updateNews(){
        this.props.setProgress(10);
        this.setState({page: this.state.page +1})
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })
        this.props.setProgress(100);
    }

    async componentDidMount() { 
        this.updateNews();
    }

    fetchMoreData = async () => {  
        this.setState({page: this.state.page +1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };



    render() {
        return (
        <>
        <div className="container my-5">
            <h3 className='text-center'>Top-News - {this.capitalizeFirstLetter(this.props.category)} Top Headlines</h3>
            {this.state.loading && <Spinner/>}
            <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                <div className="container">
                    <div className="row mt-5">
                        {this.state.articles.map((element)=>{
                            return <div className="col-md-4 col-12 d-flex justify-content-center" key={element.url}>
                                <Newsitem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,88):""} imgurl={element.urlToImage} newsurl={element.url} date={element.publishedAt} author={element.author}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
        </>
        )
    }    
}
