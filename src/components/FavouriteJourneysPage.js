import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();

const FavoriteJourneysPage = ({ userId }) => {
  const [favoriteJourneys, setFavoriteJourneys] = useState([]);

  const addFavoriteJourney = async (journey) => {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      favoriteJourneys: arrayUnion(journey),
    });

    fetchFavoriteJourneys();
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

      <button onClick={() => addFavoriteJourney("New Journey")}>
        Add Favorite Journey
      </button>
    </div>
  );
};

FavoriteJourneysPage.propTypes = {
  userId: PropTypes.string,
};

export default FavoriteJourneysPage;
