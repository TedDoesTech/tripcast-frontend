import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/app.css";
import StartPage from "./StartPage.js";
import PodcastPage from "./PodcastResult";
import BottomNavbar from "./BottomNavBar.js";
import Podcast from "./Podcast.js";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/podcastResult" element={<PodcastPage />} />
          <Route path="/podcasts" element={<Podcast />} />
        </Routes>
      </div>
      <BottomNavbar />
    </Router>
  );
}

export default App;
