// DashNav.js

import React from "react";
import "./dashNavbar.css"; // Import your CSS file
import ProfileImg from "../utils/profileImg";
export default function DashNav(props) {
  return (
    <>
      <nav className="navbarDashboard">
        <ul className="navLinks">
          <li>
            <button className="blueButton">Create team</button>
          </li>
          <li>
            <button className="blueButton">Drafts</button>
          </li>
          <li>
            <button className="blueButton">Your team</button>
          </li>
          <li>
            <button className="blueButton">Community</button>
          </li>
          <li>
            <button className="blueButton">Recent</button>
          </li>
          <li>
            <button className="blueButton">views</button>
          </li>
          <li>
            <button className="blueButton">High lights</button>
          </li>
          <li className="searchBar">
            <input type="text" placeholder="Search" />
            <i className="searchIcon"></i>
          </li>

          <li>
            <ProfileImg isNavbar="true" />
          </li>
        </ul>
      </nav>
    </>
  );
}
