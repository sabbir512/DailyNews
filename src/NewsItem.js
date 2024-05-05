import React from "react";

const NewsItem = (props) => {
  //Getting props from News component
  let { title, description, imageUrl, newsUrl, date, author } = props;

  const descriptionHandle = description.substring(0, 50) + "...";
  const titleHandle = title.substring(0, 60) + "...";

  return (
    //Based on the props data displaying with html for frontend
    <div className="my-3">
      <div className="card">
        <img
          src={imageUrl}
          className="card-img-top"
          style={{ maxHeight: 165 }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title" style={{ height: 62}}>
            {titleHandle}
          </h5>
          <p className="card-text" style={{ height: 53, paddingTop: 16 }}>
            {descriptionHandle}
          </p>
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
