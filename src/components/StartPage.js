import React, { useState } from "react";
import "../styles/startPage.css";
import axios from "axios";

const StartPage = () => {
  const [startPoint, SetStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3001/coordinates", {
        startPoint: startPoint,
        destinationPoint: destinationPoint,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="start-page container">
      <h1>Your Journey</h1>
      <p>Start a Journey to match your cast!</p>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Cast"}
        </button>
        {loading && <p>Estimated travel time... Finding podcasts...</p>}
      </form>
    </div>
  );
};

export default StartPage;
