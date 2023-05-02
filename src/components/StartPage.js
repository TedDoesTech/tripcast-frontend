import React from "react";
import "../styles/startPage.css";

const StartPage = () => {
  return (
    <div className="container">
      <h1>Your Journey</h1>
      <p>Start a Journey to match your cast!</p>
      <form>
        <label htmlFor="start-point">Start Point:</label>
        <input
          type="text"
          id="start-point"
          name="start-point"
          placeholder="Enter starting location"
        />
        <br />
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          placeholder="Enter destination"
        />
        <br />
      </form>
    </div>
  );
};

export default StartPage;
