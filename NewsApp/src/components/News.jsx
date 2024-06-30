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
    category: PropTypes.string,
    isDarkMode: PropTypes.bool.isRequired
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
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=9&apikey=a001ade1e9e1adf15d69935a20b63531&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  render() {
    const { articles, loading } = this.state;
    const { category, isDarkMode } = this.props;
    const newsClass = isDarkMode ? "news-container dark-mode" : "news-container light-mode";

    return (
      <div className={`container my-3 ${newsClass}`}>
        <h1 className="text-center font-monospace">Top {category} headlines</h1>
        {loading && <p>Loading...</p>}
        <div className="row">
          {!loading && articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 30) : ""}
                description={element.description ? element.description.slice(0, 45) : ""}
                author={element.source.author}
                date={element.publishedAt}
                imageUrl={element.image}
                newsUrl={element.url}
                isDarkMode={isDarkMode}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
