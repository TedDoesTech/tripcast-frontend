import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/BottomNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeadphones } from "@fortawesome/free-solid-svg-icons";

const BottomNavbar = () => {
  return (
    <nav className="bottom-navbar">
      <NavLink to="/" className="nav-item" activeclassname="nav-item-active">
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink
        to="/podcasts"
        className="nav-item"
        activeclassname="nav-item-active"
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </NavLink>
    </nav>
  );
};

export default BottomNavbar;
