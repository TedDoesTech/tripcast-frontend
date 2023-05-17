import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/startPage.css";
import axios from "axios";
import { genreOptions } from "./genres";
import Select from "react-select";
import { db } from "../config/firebaseConfig";
import { doc, addDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";

const StartPage = ({ userId }) => {
  const navigate = useNavigate();
  const [startPoint, setStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [favoriteJourneys, setFavoriteJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavoriteJourneys = async () => {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFavoriteJourneys(userData.savedJourneys || []);
      } else {
        console.log("No such user document!");
      }
    };

    fetchFavoriteJourneys();
  }, [userId]);

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

  const handleToggleFavorite = async () => {
    setIsFavorite(!isFavorite);

    if (
      !isFavorite &&
      startPoint.trim() !== "" &&
      destinationPoint.trim() !== ""
    ) {
      console.log(`Saving journey: ${startPoint} - ${destinationPoint}`);
      const userRef = doc(db, "users", userId);
      console.log("userRef= ", userRef);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const newJourney = {
          value: `${startPoint} - ${destinationPoint}`,
          label: `${startPoint} - ${destinationPoint}`,
        };

        await updateDoc(userRef, {
          savedJourneys: arrayUnion(newJourney),
        });

        alert("Journey saved as favorite!");
      } else {
        console.log("No such user document!");
      }
    }
  };

  const handleJourneyChange = (selectedOption) => {
    setSelectedJourney(selectedOption);
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
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
        />
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          placeholder="Enter destination"
          value={destinationPoint}
          onChange={(e) => setDestinationPoint(e.target.value)}
        />

        <div className="dropdown-container">
          <div className="dropdown-item">
            <label htmlFor="genre">Select Genre: </label>
            <Select
              id="genre"
              name="genre"
              options={genreOptions}
              className="dropdown"
              value={genreOptions.find(
                (option) => option.value === selectedGenre
              )}
            />
          </div>

          <div className="dropdown-item">
            <label htmlFor="journey">Favorite Journeys: </label>
            <Select
              id="journey"
              name="journey"
              options={favoriteJourneys}
              className="dropdown"
              value={favoriteJourneys.find(
                (option) => option.value === selectedJourney?.value
              )}
              onChange={handleJourneyChange}
            />
          </div>
        </div>
        <div className onChange={handleJourneyChange} />
        <div className="favorite-journey-container">
          <button
            type="button"
            className={`favorite-button${isFavorite ? " favorite" : ""}`}
            onClick={handleToggleFavorite}
          >
            Save as Favorite
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Cast"}
        </button>
        {loading && <p>Estimated travel time... Finding podcasts...</p>}
      </form>
    </div>
  );
};

StartPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default StartPage;
