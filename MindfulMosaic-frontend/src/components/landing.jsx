import React, { useState } from "react";
import darkLanding from "../video/dark.mp4";
import lightLanding from "../video/light.mp4";
import { useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import styles from "./landing.module.css";

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${styles.landingContainer} ${
        theme === "dark"
          ? styles.landingContainerDark
          : styles.landingContainerLight
      }`}
    >
      <div className={styles.landingRightContainer}>
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          className={styles.landingVideoContainer}
          src={theme === "dark" ? darkLanding : lightLanding}
          type="video/mp4"
        ></video>
      </div>
    </div>
  );
};

export default LandingPage;
