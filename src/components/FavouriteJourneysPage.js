import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

const FavoriteJourneysPage = ({ userId }) => {
  const [favoriteJourneys, setFavoriteJourneys] = useState([]);
  const [newJourney, setNewJourney] = useState("");

  const addFavoriteJourney = async () => {
    if (newJourney.trim() !== "") {
      const userRef = doc(db, "users", userId);

      await updateDoc(userRef, {
        favoriteJourneys: [...favoriteJourneys, newJourney],
      });

      fetchFavoriteJourneys();
      setNewJourney("");
    }
  };

  const fetchFavoriteJourneys = async () => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      setFavoriteJourneys(userDoc.data().favoriteJourneys);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchFavoriteJourneys();
  }, []);

  return (
    <div>
      <h1>Favorite Journeys</h1>

      {favoriteJourneys.map((journey, index) => (
        <div key={index}>{journey}</div>
      ))}

      <div>
        <input
          type="text"
          value={newJourney}
          onChange={(e) => setNewJourney(e.target.value)}
        />
        <button onClick={addFavoriteJourney}>Add Favorite Journey</button>
      </div>
    </div>
  );
};

FavoriteJourneysPage.propTypes = {
  userId: PropTypes.string,
};

export default FavoriteJourneysPage;
