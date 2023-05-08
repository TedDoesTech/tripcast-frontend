import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Podcast from "../components/Podcast";
import "../styles/podcastPage.css";
import axios from "axios";

const PodcastPage = () => {
  return <Podcast />;
};

export default PodcastPage;
