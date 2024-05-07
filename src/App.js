import "./App.css";

import React, { useState } from "react";
import Navbar from "./component/Navbar";
import DemoNews from "./component/demoNews";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <div>
        {/*We saw loading bar at top of the page when we load the page With Loading bar we can do that, we have initialized a state which is 0 so side the progress we have set our useState property and method is running at NewsItem component*/}
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Navbar style={{ position: "sticky" }} />

        {/*Using React-Router-Dom for page routing */}
        <Routes>
          <Route
            path="/"
            element={<DemoNews setProgress={setProgress} category="sports" />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
