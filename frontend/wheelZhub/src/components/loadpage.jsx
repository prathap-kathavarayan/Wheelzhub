import React from "react";
import "./Loading.css";
import { FaSteeringWheel } from "react-icons/fa"; // Icon library

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-icon">
        <FaSteeringWheel className="wheel" />
      </div>
    </div>
  );
}

export default Loading;