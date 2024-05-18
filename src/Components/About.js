import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container mt-96 " id="about">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">Event budget Planner</h1>
        <p className="primary-text">
          The Budget Event Planner is a web application designed to help users
          plan their events within a specified budget and time frame.
        </p>
        <p className="primary-text">
          The application allows users to input their budget and the duration of
          their event in days. Based on these inputs, the application generates
          a customized event plan that optimizes the allocation of the budget
          across various aspects of the event, such as venue, food,
          transportation, and activities.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
