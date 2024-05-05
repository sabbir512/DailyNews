import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  //Initialzing the useState to contain the news inside the array;
  const [articles, setArtices] = useState([]);
  const [loading, setLoading] = useState(true);
  //How many page will be show at first time of reload;
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //Getting news according to the props we got from app component;
  const updateNews = async () => {
    //The setProgress we got from App component
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6e4c3080450a405cbbfc04927912107b&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    //Converting the news data to json so we can use it
    let parseData = await data.json();
    props.setProgress(60);

    //Setting the news article to setArticles
    setArtices(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  //When page will be load we will show the updateNews function that's why we use useEffect
  useEffect(() => {
    document.title = `${capitalize(props.category)}-Dailynews`;
    updateNews();
  }, []);

  //Function for Fetch more data when client will scroll
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=1bbdeb5fc4bc43afb7c022dff33f06b8&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArtices(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  return (
    <div className="container my-4">
      <h2 style={{ textAlign: "center", marginTop: "90px" }}>
        DailyNews - Top {capitalize(props.category)} Headlines
      </h2>

      {loading && <Spinner />}
      {/*Using  InfiniteScroll for getting data*/}
      <InfiniteScroll
        //At first how many data will be show. We know we have an array of articles we can simpily put our array length
        dataLength={articles.length}
        //when client will scoll this function will be run for fetching more data
        next={fetchMoreData}
        //Checking the length if the length got finished
        hasMore={articles.length !== totalResults}
        //the spinner we see when scoll
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {/*articles? mean if there have any articles variables then work. since we have the articles and inside articles we have an array of articles so we are mapping through the result and displaying them to the client */}
            {articles?.map((element) => {
              const {
                title,
                description,
                urlToImage,
                url,
                author,
                publishedAt,
              } = element;

              //Checking if there have to images or title we simply returning null
              if (!urlToImage || !title || !description) {
                return null;
              }

              //Applying css so if there have no image then display will be none, In this way react won't render the empty block of news
              const cardStyle = {
                display: urlToImage ? "block" : "none",
              };
              return (
                <div className="col-md-4" style={cardStyle} key={element.title}>
                  {/*Creating new component name NewsItem and sending props to the component so we can work to other component seprately and show the result here*/}
                  <NewsItem
                    /*Inside the article we got {title, description, imageurl etc} and we are sending them as props*/
                    title={title ? title : ""}
                    description={description ? description : ""}
                    imageUrl={urlToImage}
                    newsUrl={url}
                    author={author}
                    date={publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

//if there haven't any props then this object will work as default props and we are assigning this object to the function
News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

//Talling which data type will be the props
News.propTypes = {
  country: PropTypes.string,
  // pageSize: propTypes.number,
  category: PropTypes.string,
};
export default News;
