import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import car from "../assets/car.png";
import bike from "../assets/bike.png";
import signup from "../assets/signup.png";
import "../styles/onboarding.css";

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleSwipeNext = () => {
    if (activeStep < images.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSignUp = () => {
    console.log("Name:", name);
    console.log("Email:", email);
  };

  const handleLogin = () => {
    console.log("Login with:", email);
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
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
            <button className="login-button" onClick={handleLogin}>
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
