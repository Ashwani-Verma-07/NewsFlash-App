import React, { Component } from "react";
import NewBar from "./NewsBar";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsFlash - ${this.capitalize(this.props.category)}`;
  }
  async updateNews() {
    this.props.setProgress(10);
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <>
        <h3
          style={{
            textAlign: "center",
            fontFamily: "monospace",
            marginTop: "4rem",
          }}
        >
          TOP{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {this.capitalize(this.props.category)}
          </span>{" "}
          Headlines Today
        </h3>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3 my-3" key={element.url}>
                    <NewBar
                      title={element.title === null ? "NIL" : element.title}
                      description={
                        element.description === null
                          ? "NIL"
                          : element.description.length > 0
                          ? element.description.length > 90
                            ? element.description.slice(0, 90) + "..."
                            : element.description
                          : "NIL"
                      }
                      // title={element.title}
                      // description={element.description}
                      imageURL={
                        element.urlToImage === null
                          ? "https://user-images.githubusercontent.com/89683890/195827237-a0ffe9dc-6569-4179-8ae4-8ee4e4edc044.jpg"
                          : element.urlToImage
                      }
                      newsURL={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;

// rce -> react class export component;
// rfe -> react function export component;
// 884d2958a8264bf09e3fe2044580c419 -> API key NEWs
//au->australia us-> united states nz-> new Zealand ca->canada sg->singapore ph ->Philippines sa->south Africa my->Malaysia
//884d2958a8264bf09e3fe2044580c419
//04fb5ddc408845a7864df9dbb85d6db8
