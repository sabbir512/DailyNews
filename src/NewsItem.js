import React from "react";

const NewsItem = (props) => {
  //Getting props from News component
  let { title, description, imageUrl, newsUrl, date, author } = props;
  
  return (
    //Based on the props data displaying with html for frontend
    <div className="my-3">
      <div className="card">
        {/*Displaying the image TODO: need to fix when there will be no image*/}
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author} on {date}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
