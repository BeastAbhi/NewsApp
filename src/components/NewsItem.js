import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, image, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3 bg-dark">
        <div
          className="card bg-dark "
          style={{ width: "20rem", color: "white" }}
        >
          <div style={{display: "flex",justifyContent: "flex-start",position:"absolute", left: '0'}}>
          <span className="badge rounded-pill bg-primary">{source}</span>
          </div>
          <img src={image} className="card-img-top " alt={image} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btm-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
