import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SwipeableViews from "react-swipeable-views";
import car from "../assets/car.png";
import signup from "../assets/signup.png";
import "../styles/onboarding.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleSwipeNext = () => {
    if (activeStep < images.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setSignUpError(true);
      setErrorMessage("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, " signed up successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error signing up: ", error);
        setSignUpError(true);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email is already in use");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Invalid email format");
        } else {
          setErrorMessage("Unexpected error occurred, please try again");
        }
      });
  };

  const images = [
    {
      image: car,
      heading: "Fix your commute",
      text: "With personalized commute soundtrack",
    },
    {
      image: car,
      heading: "Podcasts to Match Your Miles",
      text: "Discover a wide range of podcasts for your commute",
    },
    {
      image: signup,
      heading: "Sign up now",
      text: "Unlock exclusive benefits and access",
    },
  ];

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="onboarding-container">
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        resistance
      >
        {images.map((item, index) => (
          <div key={index} className="onboarding-step">
            <img src={item.image} alt={`Step ${index + 1}`} />
            <h1 className="onboarding-heading">{item.heading}</h1>
            <p className="onboarding-text">{item.text}</p>
            {activeStep === images.length - 1 && (
              <div className="signup-form">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={signUpError ? "shake error" : ""}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={signUpError ? "shake error" : ""}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={signUpError ? "shake error" : ""}
                />
                <p className={signUpError ? "error-message" : ""}>
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        ))}
      </SwipeableViews>

      <div className="onboarding-navigation">
        {activeStep === images.length - 1 ? (
          <div>
            <button className="onboarding-nav-button" onClick={handleSignUp}>
              Create an account
            </button>
            <button className="login-button" onClick={navigateToLogin}>
              Login
            </button>
          </div>
        ) : (
          <button
            className="onboarding-nav-button"
            onClick={handleSwipeNext}
            disabled={activeStep === images.length - 1}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
