import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/audioComponent.css";

const AudioComponent = ({ src }) => {
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/podcastResult", {
      state: { podcastResults: podcastResults },
    });
  };

  const toggle = () => setPlaying(!playing);

  const handleTimeChange = (event) => {
    audio.currentTime = event.target.value;
    setCurrentTime(audio.currentTime);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime)
    );
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
      audio.removeEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
    };
  }, []);

  return (
    <div className="audio-component">
      <div className="audio-controls">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max={audio.duration}
            value={currentTime}
            onChange={handleTimeChange}
          />
          <button className="play-button" onClick={toggle}>
            {playing ? "Pause" : "Play"}
          </button>
          <div className="slider-times">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="duration">{formatTime(audio.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AudioComponent.propTypes = {
  src: PropTypes.string.isRequired,
};

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  return `${minutes}.${formattedSeconds}`;
}

export default AudioComponent;
