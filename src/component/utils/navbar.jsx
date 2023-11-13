import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./slider";
import logo from "../../assets/logo.svg";
import hamImg from "../../assets/hamburgerOpen.svg";
import { useAuth } from "./authContext";
import ProfileImg from "./profileImg";

export default function Navbar(props) {
  const { authToken } = useAuth();

  function profilePage() {
    console.log(authToken);
    navigate("/profile");
  }
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function pricePage() {
    navigate("/price");
    console.log(authToken);
    console.log(authToken != null);
  }

  const handlePhotoChange = (newPhoto) => {
    props.onPhotoChange(newPhoto);
  };

  return (
    <div className="navContainer">
      <nav className={`homeNavbar ${isMenuOpen ? "open" : ""}`}>
        <div className="homePageIcon">
          <img src={logo} alt="Logo" />
          <h1>Pro-Go</h1>
        </div>
        <div
          className={`menuToggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <img src={hamImg} alt="Close Menu" />
          ) : (
            <img src={hamImg} alt="Open Menu" />
          )}
        </div>
        <div className={`navItems ${isMenuOpen ? "open" : ""}`}>
          <Slider title="Solutions">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Slider>
          <Slider title="Plans">
            <ul>
              <li>Item A</li>
              <li>Item B</li>
              <li>Item C</li>
            </ul>
          </Slider>
          <Link to="/price" onClick={pricePage}>
            Pricing
          </Link>
          <Slider title="Resources">
            <ul>
              <li onClick={() => navigate("/dash")}>Dash Board</li>
              <li onClick={() => navigate("/profile")}>Profile</li>
              <li>Item C</li>
            </ul>
          </Slider>
          {authToken !== null ? (
            <>
              <button className="profileNavButton" onClick={profilePage}>
                Hello User!
              </button>
              <ProfileImg
                onPhotoChange={handlePhotoChange}
                isNavbar="true"
                img={props.newPhoto}
              />
            </>
          ) : (
            <>
              <button
                className="signInButton"
                onClick={() => navigate("/logIn")}
              >
                Sign in
              </button>

              <button
                className="signUpButton"
                onClick={() => navigate("/signUp")}
              >
                Sign up for free
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
