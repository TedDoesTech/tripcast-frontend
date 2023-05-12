import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/audioComponent.css";

const AudioComponent = ({ src }) => {
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    localStorage.getItem("audioPlayerTime")
      ? parseFloat(localStorage.getItem("audioPlayerTime"))
      : 0
  );

  const toggle = () => {
    localStorage.setItem("audioPlayerTime", audio.currentTime.toString());
    setPlaying(!playing);
  };

  const handleTimeChange = (event) => {
    audio.currentTime = parseFloat(event.target.value);
    setCurrentTime(audio.currentTime);
  };

  useEffect(() => {
    const savedTime = localStorage.getItem("audioPlayerTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
      setCurrentTime(parseFloat(savedTime));
    }

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime)
    );

    return () => {
      audio.removeEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.removeEventListener("ended", () => setPlaying(false));
      audio.removeEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
      localStorage.setItem("audioPlayerTime", audio.currentTime.toString());
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
      localStorage.setItem("audioPlayerTime", audio.currentTime.toString());
    }
  }, [playing, audio]);

  return (
    <div className="audio-component">
      <div className="audio-controls">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
          />
          <button className="play-button" onClick={toggle}>
            {playing ? "Pause" : "Play"}
          </button>
          {currentTime > 0.01 && (
            <div className="slider-times">
              <span className="current-time">{formatTime(currentTime)}</span>
              <span className="duration">{formatTime(duration)}</span>
            </div>
          )}
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
  return `${minutes}:${formattedSeconds}`;
}

export default AudioComponent;
