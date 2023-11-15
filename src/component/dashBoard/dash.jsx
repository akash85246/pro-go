
import logo from "../../assets/footer_logo.svg";

import userImg from "../../assets/profilePhoto.png";
import { useState } from "react";
import "./dash.css";
import ProfileImg from "../utils/profileImg";
import Sidebar from "./sidebar";
import Slider from "../utils/slider";

export default function DashBoard() {
 
  return (
    <>
      <div className="workSpaceContainer">
        <div className="sidebar">
          <div className="sidebarLogo">
            <img src={logo}></img>
            <h2>Pro-Go</h2>
          </div>
          <Sidebar />
        </div>
        <div className="dashMainContainer">
          <div className="navbarDash">
            <Slider title="Recent">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Slider>
            <Slider title="Open File">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Slider>
            <Slider title="Workspace">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Slider>
            <Slider title="Clipboard">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Slider>
            <Slider title="Template">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Slider>
            <button className="searchButton">Search</button>
            <button className="createButton">create</button>
            <ProfileImg img={userImg} isNavbar="true" />
          </div>
          <div className="dashMain"></div>
        </div>
      </div>
    </>
  );
}
