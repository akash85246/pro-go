import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../landingPage/Dropdown";
import logo from "../../assets/logo.svg";
import hamImg from "../../assets/hamburgerOpen.svg";
// import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Dropdown title="Solutions">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Dropdown>
          <Dropdown title="Plans">
            <ul>
              <li>Item A</li>
              <li>Item B</li>
              <li>Item C</li>
            </ul>
          </Dropdown>
          <Link to="/pricing">Pricing</Link>
          <Dropdown title="Resources">
            <ul>
              <li>Item A</li>
              <li>Item B</li>
              <li>Item C</li>
            </ul>
          </Dropdown>

          {localStorage.getItem("user-info") ? (
            <>
              <button className="signInButton">Profile</button>
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
