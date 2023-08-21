import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const  News = (props)=> {

    const capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // document.title = `${capitalizeFirstLetter(category)} - Top-News`;

    const updateNews  = async ()=>{
        props.setProgress(10);
        setPage(page+1)
        let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])
    

    const fetchMoreData = async () => {  
        setPage(page+1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };


        return (
        <>
        <div className="container my-5">
            <h3 className='text-center'>Top-News - {capitalizeFirstLetter(props.category)} Top Headlines</h3>
            {loading && <Spinner/>}
            <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                <div className="container">
                    <div className="row mt-5">
                        {articles.map((element)=>{
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


export default News;