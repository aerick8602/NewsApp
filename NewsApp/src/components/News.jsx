import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=070cb9e85332417f801a55d877687676&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevPage = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.updateNews
    );
  };

  handleNextPage = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;
    const { pageSize, category } = this.props;
    return (
      <div className="container my-3">
        <h1 className="text-center font-monospace">Top {category} headlines</h1>
        {loading && <p>Loading...</p>}
        <div className="row">
          {!loading && articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 30) : ""}
                description={element.description ? element.description.slice(0, 45) : ""}
                author={element.author}
                date={element.publishedAt}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevPage}
          >
            &laquo; Prev
          </button>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextPage}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
