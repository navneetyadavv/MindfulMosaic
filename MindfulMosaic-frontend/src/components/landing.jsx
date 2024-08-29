import React, { useContext } from "react";
import { ThemeContext } from "../App";
import styles from "./landing.module.css";

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);

  const darkVideoUrl = "https://res.cloudinary.com/dqkajntnw/video/upload/v1724907267/bomfrsbtz6sxmqdyzszd.mp4";
  const lightVideoUrl = "https://res.cloudinary.com/dqkajntnw/video/upload/v1724907267/zcsqqhizq4z3o2nksell.mp4";

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
          src={theme === "dark" ? darkVideoUrl : lightVideoUrl}
          type="video/mp4"
        ></video>
      </div>
    </div>
  );
};

export default LandingPage;
