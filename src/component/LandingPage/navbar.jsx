import React from "react"; // Don't forget to import React if you're using JSX
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import logo from "../../assets/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="homeNavbar">
      <div className="homePageIcon">
        <img src={logo} alt="Logo" />
        <h1>Pro-Go</h1>
      </div>
      <div>
        <Dropdown title="Solutions">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Dropdown>
        {/* <button onClick={() => navigate("/home")}>Home</button> */}
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
            <button className="signInButton" onClick={() => navigate("/logIn")}>
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
  );
}
