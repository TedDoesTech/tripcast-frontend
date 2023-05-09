import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/startPage.css";
import axios from "axios";

const StartPage = () => {
  const navigate = useNavigate();
  const [startPoint, SetStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/podcast", {
        startPoint: startPoint,
        destinationPoint: destinationPoint,
        selectedGenre: selectedGenre,
      });
      console.log(response.data.results);
      const podcastResult = response.data.results;
      navigate("/podcastResult", { state: { podcastResults: podcastResult } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

        <label htmlFor="genre">Select Genre: </label>
        <select
          id="genre"
          name="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value=""> --Please select an genre--</option>
          <option value="133"> Comedy </option>
          <option value="77"> Sports </option>
          <option value="99"> News </option>
          <option value="127"> Technology </option>
          <option value="93"> Business </option>
          <option value="134"> Music </option>
          <option value="125"> History </option>
          <option value="151"> Locally Focused </option>
          <option value="132"> Kids & Family </option>
          <option value="168"> Fiction </option>
          <option value="122"> Society & Culture </option>
          <option value="88"> Health & Fitness </option>
          <option value="100"> Arts </option>
          <option value="69">Religion & Spirituality</option>
          <option value="117"> Government </option>
          <option value="135"> True Crime </option>
          <option value="68"> TV & Film </option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Cast"}
        </button>
        {loading && <p>Estimated travel time... Finding podcasts...</p>}
      </form>
    </div>
  );
};

export default StartPage;
