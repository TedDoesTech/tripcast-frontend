import React, { useState } from "react";
import "../styles/startPage.css";
import { getDirections } from "../services/api";

const StartPage = () => {
  const [startPoint, SetStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");

  const getTravelTime = async (startPoint, destinationPoint) => {
    const apiKey = "ENTER API KEY HERE";

    const startPointCoordinates = "-2.242631,53.480759";
    const destinationPointCoordinates = "-2.134803,53.389195";

    const directionsData = await getDirections(
      startPointCoordinates,
      destinationPointCoordinates,
      apiKey
    );

    const durationInSeconds =
      directionsData.features[0].properties.summary.duration;
    console.log(durationInSeconds);
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
