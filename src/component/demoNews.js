/*WHY IS THIS COMPONENT? 
I HAVE USED A API FOR THIS PROJECT WHICH IS ONLY FREE FOR LOCALHOST, IF I WANT TO DEPLOY THE WEBSITE I HAVE TO BUY THIER SERVICES, WHICH I DON'T WANT TO, that's why i am using the demo News*/
import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import jsonNewsdata from "../data/data";

function DemoNews(props) {
  const articles = jsonNewsdata.articles;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const totalResults = jsonNewsdata.totalResults;

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
        // next={fetchMoreData}
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
}

export default DemoNews;
