import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./slider";
import logo from "../../assets/logo.svg";
import hamImg from "../../assets/hamburgerOpen.svg";
import solution1Img from "../../assets/solution1.svg";
import solution2Img from "../../assets/solution2.svg";
import plan1Img from "../../assets/plan1.svg";
import plan2Img from "../../assets/plan2.svg";
import plan3Img from "../../assets/plan3.svg";
import solution3Img from "../../assets/solution3.svg";
import resource1Img from "../../assets/resource1.svg";
import axios from "axios"; // Import Axios
import { useAuth } from "./authContext";
import ProfileImg from "./profileImg";

export default function Navbar(props) {
  const { authToken } = useAuth();
  const [photoUrl, setPhotoUrl] = useState(null);
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
            <h1>
              Take a page out of these pre-built Pro-Go playbooks{" "}
              <span> designed for all teams</span>
            </h1>
            <div className="solutionContainer">
              <div>
                <h3>Pro-Go For Marketing Teams</h3>
                <img src={solution1Img}></img>
                <p>
                  Whether launching a new product, campaign, or creating
                  content, experience how Pro-Go helps marketing teams around
                  the world organize, plan, and get more done.
                </p>
              </div>
              <div>
                <h3>Pro-Go For Design Teams</h3>
                <img src={solution2Img}></img>
                <p>
                  From creative brainstorms to the final touches, discover how
                  Pro-Go helps your design teams deliver with style.
                </p>
              </div>
              <div>
                <h3>Pro-Go For Remote Teams</h3>
                <img src={solution3Img}></img>
                <p>
                  From team bonding and brainstorming to meetings and project
                  planning, discover how Pro-Go keeps remote teams connected, no
                  matter where they’re located around the world.
                </p>
              </div>
            </div>
          </Slider>
          <Slider title="Plans">
            <h1>
              Whether you’re a team of 2 or 2,000, Pro-Go flexible pricing model
              means you only <span> pay for what you need.</span>
            </h1>
            <div className="solutionContainer">
              <div>
                <h3>Professional</h3>
                <img src={plan1Img}></img>
                <button onClick={() => navigate("/price")}>
                  Go to Pricing
                </button>
              </div>
              <div>
                <h3>Standard</h3>
                <img src={plan2Img}></img>
                <button onClick={() => navigate("/price")}>
                  Go to Pricing
                </button>
              </div>
              <div>
                <h3>Premium</h3>
                <img src={plan3Img}></img>
                <button onClick={() => navigate("/price")}>
                  Go to Pricing
                </button>
              </div>
            </div>
          </Slider>
          <Link to="/price" onClick={pricePage}>
            Pricing
          </Link>
          <Slider title="Resources">
            <h1>
              Whether you’re a team of 2 or 2,000, Pro-Go flexible pricing model
              means you only <span> pay for what you need.</span>
            </h1>
            <div className="resourceContainer">
              <div className="resourceButtons">
                <button onClick={() => navigate("/dashboard")}>
                  Pro-Go Webinars
                </button>
                <button onClick={() => navigate("/dashboard")}>
                  {" "}
                  Pro-Go Remote
                </button>
                <button onClick={() => navigate("/dashboard")}>
                  Pro-Go Developer
                </button>
                <button onClick={() => navigate("/dashboard")}>
                  Pro-Go Customer Stories
                </button>
              </div>
              <img src={resource1Img}></img>
            </div>
          </Slider>
          {console.log("nav", authToken)}
          {authToken !== null ? (
            <>
              <button
                className="profileNavButton"
                onClick={() => navigate("/dashboard")}
              >
                Hello User!
              </button>
              {props.showProfilePhoto && (
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
