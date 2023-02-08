import React, { useEffect, useState } from "react";
import NewBar from "./NewsBar";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import PropTypes from "prop-types";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setState] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setState(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `NewsFlash - ${capitalize(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, []);
  const fetchMoreData = async () => {
    setState(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

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
          {capitalize(props.category)}
        </span>{" "}
        Headlines Today
      </h3>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
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
};

News.defaultProps = {
  country: "in",
  pageSize: 20,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

// rce -> react class export component;
// rfe -> react function export component;
// 884d2958a8264bf09e3fe2044580c419 -> API key NEWs
//au->australia us-> united states nz-> new Zealand ca->canada sg->singapore ph ->Philippines sa->south Africa my->Malaysia
//884d2958a8264bf09e3fe2044580c419
//04fb5ddc408845a7864df9dbb85d6db8
//ae ar at au be bg br ca ch cn co cu cz de eg fr gb
//gr hk hu id ie il in it jp kr lt lv ma mx my ng nl
//no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za
