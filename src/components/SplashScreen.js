import React, { useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ setShowSplash }) => {
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000);
  }, [setShowSplash]);

  return (
    <div className="splash__screen">
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
        <text className="cls-1">
          <tspan x="50" y="50">
            code.js
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default SplashScreen;
