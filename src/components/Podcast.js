import React from "react";
import { useLocation } from "react-router-dom";
import AudioComponent from "../components/AudioComponent";
import "../styles/podcast.css";

const Podcast = () => {
  const { state } = useLocation();
  let selectedPodcast = state?.selectedPodcast;

  if (!selectedPodcast) {
    selectedPodcast = JSON.parse(localStorage.getItem("selectedPodcast"));
  }

  if (!selectedPodcast) {
    return <p>No podcast selected</p>;
  }

  return (
    <div className="podcast-page-container">
      <div className="podcast-image">
        <img src={selectedPodcast.image} alt={selectedPodcast.title} />
        <div className="podcast-header">
          <h1>{selectedPodcast.title_original}</h1>
        </div>
        <h4>{Math.round(selectedPodcast.audio_length_sec / 60)} mins</h4>
      </div>
      <div className="podcast-audio">
        <AudioComponent src={selectedPodcast.audio} />
      </div>
    </div>
  );
};

export default Podcast;
