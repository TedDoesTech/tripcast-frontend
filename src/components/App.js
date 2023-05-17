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
import FavoriteJourneysPage from "./FavouriteJourneysPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Onboarding setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
            }
          />
          <Route path="/home" element={<StartPage userId={userId} />} />
          <Route path="/podcastResult" element={<PodcastPage />} />
          <Route path="/podcasts" element={<Podcast />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/saved" element={<FavoriteJourneysPage />} />
        </Routes>
      </div>
      {isLoggedIn && <BottomNavbar setIsLoggedIn={setIsLoggedIn} />}
    </Router>
  );
}

export default App;
