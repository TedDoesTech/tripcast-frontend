import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/BottomNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeadphones,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

const BottomNavbar = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        console.log("User signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <nav className="bottom-navbar">
      <NavLink
        to="/home"
        className="nav-item"
        activeclassname="nav-item-active"
      >
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink
        to="/podcasts"
        className="nav-item"
        activeclassname="nav-item-active"
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </NavLink>
      <NavLink
        onClick={handleLogout}
        to="/login"
        className="nav-item"
        activeclassname="nav-item-active"
      >
        <FontAwesomeIcon icon={faSignOut} />
      </NavLink>
    </nav>
  );
};
BottomNavbar.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
export default BottomNavbar;
