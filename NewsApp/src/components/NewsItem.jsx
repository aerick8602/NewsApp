import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "25rem", height: "22rem", boxShadow: "1px 1px gray" }}>

          <img
            src={imageUrl || "https://blog.playstation.com/tachyon/2023/10/cd56722db7b991b3d7a33f1bafd55f80d0ac553d.png?resize=1088%2C612&crop_strategy=smart&zoom=1.5"}
            className="card-img-top"
            alt="News"
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title && title.length > 30 ? title.slice(0, 30) + '...' : title}</h5>
            <p className="card-text">{description && description.length > 45 ? description.slice(0, 45) + '...' : description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author || "Unknown"} on {new Date(date).toLocaleDateString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
