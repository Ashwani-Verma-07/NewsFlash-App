import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const pageSize = 20;
  const country = "in";
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color="#f11946" height={3} progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="generall"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={setProgress}
                key="general"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                image={URL}
                apiKey={apiKey}
                pageSize={pageSize}
                country={country}
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
