import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/app.css";
import StartPage from "./StartPage.js";
import BottomNavbar from "./BottomNavBar.js";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </div>
      <BottomNavbar />
    </Router>
  );
}

export default App;
