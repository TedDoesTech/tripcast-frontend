import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/podcastResult.css";

const PodcastResult = () => {
  const { state } = useLocation();
  const podcastResults = state?.podcastResults || [];
  const [expandedPodcastId, setExpandedPodcastId] = useState(null);

  const handlePodcastItemClick = (podcastId) => {
    if (podcastId === expandedPodcastId) {
      setExpandedPodcastId(null);
    } else {
      setExpandedPodcastId(podcastId);
    }
  };

  const cleanDescription = (description) => {
    const regex = /(<([^>]+)>)/gi;
    return description.replace(regex, "");
  };

  const handlePlayButtonClick = (podcast) => {
    localStorage.setItem("selectedPodcast", JSON.stringify(podcast));
  };

  return (
    <div className="podcast-page container">
      <h1>Podcasts</h1>
      {podcastResults.map((podcast) => (
        <div
          className={`podcast-item ${
            podcast.id === expandedPodcastId ? "expanded" : ""
          }`}
          key={podcast.id}
          onClick={() => handlePodcastItemClick(podcast.id)}
        >
          <div className="podcast-image">
            <img
              src={podcast.image || "https://via.placeholder.com/150"}
              alt={podcast.title}
            />
          </div>
          <div className="podcast-info">
            <div className="podcast-header">
              <h3>{podcast.title_original}</h3>
              <h4>{Math.round(podcast.audio_length_sec / 60)} mins</h4>
              {podcast.id === expandedPodcastId ? (
                <Link
                  to={{
                    pathname: "/podcasts",
                    state: { selectedPodcast: podcast },
                  }}
                  className="play-button"
                  onClick={() => handlePlayButtonClick(podcast)}
                >
                  <button>Play</button>
                </Link>
              ) : null}
            </div>
            {podcast.id === expandedPodcastId ? (
              <div className="podcast-description">
                {cleanDescription(podcast.description_original)}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PodcastResult;
