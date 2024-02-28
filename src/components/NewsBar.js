import React from "react";
import "./NewsBar.css";
const NewBar = (props) => {
  let { title, description, imageURL, newsURL, author, date, source } = props;
  return (
    <div
      className="container"
      style={{ maxWidth: "none", display: "grid", justifyContent: "center" }}
    >
      <div className="card" style={{ width: "18rem", height: "31rem" }}>
        <div
          className="badge"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
            padding: "0",
            height: "auto",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageURL}
          className="card-img-top"
          alt="..."
          style={{
            width: "auto",
            borderRadius: "5px",
            height: "10rem",
            display: "flex",
            justifyContent: "center",
          }}
        />
        <div
          className="card-body"
          style={{
            width: "18rem",
            height: "auto",
            overflow: "auto",
          }}
        >
          <h5 className="card-title" style={{ fontSize: "18px" }}>
            {title}
          </h5>
          <p className="card-text my-1">{description}</p>
          <p className="card-text my-1">
            <small className="text-muted">
              By {author === null ? "UnKnown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsURL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
// {}=> for javascript
//{{}}=> for javascrip object => styling occures;
export default NewBar;
