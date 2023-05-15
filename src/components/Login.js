import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import signup from "../assets/signup.png";
import "../styles/onboarding.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const images = {
    image: signup,
    heading: "Login now",
    text: "Unlock exclusive benefits and access",
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home");
        console.log(user, " Logged in successfully");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("Error logging in: ", error);
      });
  };
  const navigateToOnboarding = () => {
    navigate("/onboarding");
  };
  return (
    <div className="onboarding-container">
      {
        <div className="onboarding-step">
          <img src={images.image} alt={`Login image`} />
          <h1 className="onboarding-heading">{images.heading}</h1>
          <p className="onboarding-text">{images.text}</p>
          {
            <div className="signup-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          }
        </div>
      }
      <div className="onboarding-navigation">
        {
          <div>
            <button
              className="onboarding-nav-button"
              onClick={navigateToOnboarding}
            >
              Create an account
            </button>
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        }
      </div>
    </div>
  );
};
Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
export default Login;
