import React, { useEffect, useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props)=>{
const[articles, setArtices]=useState([])
const[loading, setLoading]=useState(true)
const[page, setPage]=useState(1)
const[totalResults, setTotalResults]=useState(0)

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  

  const updateNews= async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6e4c3080450a405cbbfc04927912107b&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    console.log(parseData);
    setArtices(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    
     props.setProgress(100);
  }

  useEffect(()=>{
document.title = `${capitalize(props.category)}-Dailynews`;

    updateNews();
  }, [] )


  const handlePreviousClick = async () => {

    setPage(page - 1)
    updateNews();

  }

  const handleNextClick = async () => {

    setPage(page + 1)
    updateNews();
  }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6e4c3080450a405cbbfc04927912107b&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArtices(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults);

  }


    return (
      <div className='container my-4'>
        <h2 style={{ textAlign: "center", marginTop: "90px" }}>DailyNews - Top {capitalize(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

          <div className="container"> 
          <div className="row">
            {articles?.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>

            })}
          </div>
          </div>
        </InfiniteScroll>

      </div>
    )
  }

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  // pageSize: propTypes.number,
  category: PropTypes.string,
}
export default News