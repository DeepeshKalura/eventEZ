import React from "react";
import BannerBackground from "../Assets/about-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import About from "./About";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container mx-16 my-6">
        <div className="home-banner-container">
          <div className="home-bannerImage-container pt-4">
            <img src={BannerBackground} alt="" className="rotate-180 " />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">EVENTS</h1>
            <p className="primary-text text-bold">
              Discover exciting events happening near you! <br />
              Whether you're a culture enthusiast, a music lover, a foodie, or
              an outdoor adventurer, there's something for everyone to discover
              and enjoy.
            </p>
            <Link to="/events">
            <button className="secondary-button">
              {"Go to Events"}
              <FiArrowRight />
            </button>
            </Link>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
        <About />
        <Contact />
        <Testimonial />
      </div>
    </>
  );
};

export default Home;
