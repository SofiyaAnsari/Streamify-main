import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import "./watch.scss";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;

  // Check if 'movie' is defined before accessing its properties
  const videoSource = movie?.video || ''; // Provide a default value if 'video' is undefined

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay controls src={videoSource} />
    </div>
  );
}
