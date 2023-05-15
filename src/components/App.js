import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/app.css";
import StartPage from "./StartPage.js";
import PodcastPage from "./PodcastResult";
import BottomNavbar from "./BottomNavBar.js";
import Podcast from "./Podcast.js";
import Settings from "./settingsPage";
import Onboarding from "./onboarding";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Onboarding setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/home" element={<StartPage />} />
          <Route path="/podcastResult" element={<PodcastPage />} />
          <Route path="/podcasts" element={<Podcast />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      {isLoggedIn && <BottomNavbar />}
    </Router>
  );
}

export default App;
