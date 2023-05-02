import React, { useState } from "react";
import "../styles/startPage.css";

const StartPage = () => {
  const [startPoint, SetStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [travelTime, setTravelTime] = useState(null);

  const getTravelTime = async (startPoint, destinationPoint) => {
    console.log(startPoint, destinationPoint);
  };

  return (
    <div className="start-page container">
      <h1>Your Journey</h1>
      <p>Start a Journey to match your cast!</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="start-point">Start Point:</label>
        <input
          type="text"
          id="start-point"
          name="start-point"
          placeholder="Enter starting location"
          onChange={(e) => SetStartPoint(e.target.value)}
        />

        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          placeholder="Enter destination"
          onChange={(e) => setDestinationPoint(e.target.value)}
        />
        <button onClick={() => getTravelTime(startPoint, destinationPoint)}>
          Cast
        </button>
      </form>
    </div>
  );
};

export default StartPage;
