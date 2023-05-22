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
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");
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
        console.log(user, " Logged in successfully");
        setIsLoggedIn(true);
        setUserId(user.uid);
        setLoginError(false);
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error logging in: ", error);
        setLoginError(true);
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Invalid email format");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("No user found with this email");
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage("Wrong password");
        } else {
          setErrorMessage("Unexpected error occurred, please try again");
        }
      });
  };

  const navigateToOnboarding = () => {
    navigate("/");
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-step">
        <img src={images.image} alt={`Login image`} />
        <h1 className="onboarding-heading">{images.heading}</h1>
        <p className="onboarding-text">{images.text}</p>
        <div className="signup-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={loginError ? "shake error" : ""}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={loginError ? "shake error" : ""}
          />
          <p className={loginError ? "error-message" : ""}>{errorMessage}</p>
        </div>
      </div>
      <div className="onboarding-navigation">
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
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
