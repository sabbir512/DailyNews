/*WHY IS THIS COMPONENT? 
I HAVE USED A API FOR THIS PROJECT WHICH IS ONLY FREE FOR LOCALHOST, IF I WANT TO DEPLOY THE WEBSITE I HAVE TO BUY THIER SERVICES, WHICH I DON'T WANT TO, that's why i am using the demo News*/
//NEW API
//https://newsdata.io/api/1/news?apikey=pub_43515b19f4a560f2b7cedff7a8facf9f1f087&q=sport&language=en&size=2&page=1
import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import jsonNewsdata from "../../data";

function DemoNews() {
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

     setLoading(true);

     props.setProgress(30);
     setArtices(jsonNewsdata.articles);
     setTotalResults(jsonNewsdata.totalResults);
     setLoading(false);
     props.setProgress(60);
 
     //Setting the news article to setArticles
  
 
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
 
  return <div>DemoNews</div>;
}

export default DemoNews;
