// Sidebar.js

import React, { useState } from "react";
import "./sidebar.css";
import boardImg from "../../assets/boardImg.svg";
import member from "../../assets/member.svg";
import setting from "../../assets/setting.svg";
import table from "../../assets/table.svg";
import calender from "../../assets/calender.svg";
import bullet from "../../assets/goBoard.svg";
import flag from "../../assets/Flag.svg";
import wFlag from "../../assets/wFlag.svg";
import Slider from "../utils/slider";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();
  function toWorkSpace() {
    navigate("/workspace");
  }
  return (
    <>
      <div className={`sidebarContain ${sidebarOpen ? "open" : ""}`}>
        <h3 onClick={toggleSidebar}>Home</h3>
        <ul>
          <li>
            <img src={boardImg} alt="Board Icon" />
            <h4>Boards</h4>
          </li>
          <li>
            <div>
              <img src={member} alt="Member Icon" />
              <h4 onClick={toWorkSpace}>Members</h4>
            </div>
            <span onClick={toWorkSpace}>+</span>
          </li>
          <li>
            <span>
              <img src={setting} alt="Setting Icon" />
            </span>
            <Slider title="Workspace setting">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Slider>
          </li>
        </ul>
        <h3>Workspace Views</h3>
        <ul>
          <li>
            <img src={table} alt="Table Icon" />
            <h4>Table</h4>
          </li>
          <li>
            <img src={calender} alt="Calendar Icon" />
            <h4>Calendar</h4>
          </li>
        </ul>
        <h3>
          <span>Your boards</span>
          <span>+</span>
        </h3>
        <ul>
          <li>
            <img src={bullet} alt="Bullet Icon" />
            <h4>My Pro-Go board</h4>
          </li>
          <li>
            <img src={flag} alt="Flag Icon" />
            <h4>To Do</h4>
          </li>
          <li>
            <img src={flag} alt="Flag Icon" />
            <h4>Doing</h4>
          </li>
          <li>
            <img src={wFlag} alt="White Flag Icon" />
            <h4>Done</h4>
          </li>
        </ul>
        <div className="sidebarButtonContainer">
          <div>
            <button className="premiumButton">Try Premium Free</button>
          </div>
        </div>
      </div>
    </>
  );
}
