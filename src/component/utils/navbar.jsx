import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./slider";
import logo from "../../assets/logo.svg";
import hamImg from "../../assets/hamburgerOpen.svg";
import axios from "axios"; // Import Axios
import { useAuth } from "./authContext";
import ProfileImg from "./profileImg";

export default function Navbar(props) {
  const { authToken } = useAuth();
  const [photoUrl, setPhotoUrl] = useState(null); // Add photoUrl state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      fetchPhoto();
    }
  }, [authToken]);

  const fetchPhoto = async () => {
    try {
      const response = await axios.get(
        "https://pro-go.onrender.com/api/get-photo",
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      const data = response.data;
      if (data.success) {
        setPhotoUrl(data.photoUrl);
      } else {
        console.error("Failed to fetch user photo");
      }
    } catch (error) {
      console.error("Error fetching user photo:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function profilePage() {
    console.log(authToken);
    navigate("/profile");
  }

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
              <li onClick={() => navigate("/dashboard")}>Dash Board</li>
              <li onClick={() => navigate("/profile")}>Profile</li>
              <li>Item C</li>
            </ul>
          </Slider>
          {authToken !== null ? (
            <>
              <button className="profileNavButton" onClick={profilePage}>
                Hello User!
              </button>
              {props.showProfilePhoto  && (
                <ProfileImg
                  onPhotoChange={handlePhotoChange}
                  isNavbar="true"
                  img={photoUrl}
                />
              )}
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
