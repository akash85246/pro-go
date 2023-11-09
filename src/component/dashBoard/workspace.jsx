import logo from "../../assets/footer_logo.svg";
import boardImg from "../../assets/boardImg.svg";
import member from "../../assets/member.svg";
import setting from "../../assets/setting.svg";
import table from "../../assets/table.svg";
import calender from "../../assets/calender.svg";
import bullet from "../../assets/goBoard.svg";
import flag from "../../assets/Flag.svg";
import wFlag from "../../assets/wFlag.svg";
import userImg from "../../assets/profilePhoto.png";
import { useState } from "react";
import "./workSpace.css";
import Dropdown from "../utils/dropdown";
import ProfileImg from "../utils/profileImg";
export default function DashBoard() {
  return (
    <>
      <div className="workSpaceContainer">
        <div className="sidebar">
          <div className="sidebarLogo">
            <img src={logo}></img>
            <h2>Pro-Go</h2>
          </div>
          <div className="sidebarContain">
            <h3>Home</h3>
            <ul>
              <li>
                <img src={boardImg}></img>
                <h4>Boards</h4>
              </li>
              <li>
                <div>
                  <img src={member}></img>
                  <h4>Members</h4>
                </div>
                <span>+</span>
              </li>
              <li>
                <span>
                  <img src={setting}></img>
                </span>
                <Dropdown title="Workspace setting">
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </Dropdown>
              </li>
            </ul>
            <h3>Workspace Views</h3>
            <ul>
              <li>
                <img src={table}></img>
                <h4>Table</h4>
              </li>
              <li>
                <img src={calender}></img>
                <h4>Calender</h4>
              </li>
            </ul>
            <h3>
              <span>Your boards</span>
              <span>+</span>
            </h3>
            <ul>
              <li>
                <img src={bullet}></img>
                <h4>My Pro-Go board</h4>
              </li>
              <li>
                <img src={flag}></img>
                <h4>To Do</h4>
              </li>
              <li>
                <img src={flag}></img>
                <h4>Doing</h4>
              </li>
              <li>
                <img src={wFlag}></img>
                <h4>done</h4>
              </li>
            </ul>
            <div className="sidebarButtonContainer">
              <div>
                <button className="premiumButton">Try Premium Free</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dashMainContainer">
          <div className="navbarDash">
            <Dropdown title="Recent">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Dropdown>
            <Dropdown title="Open File">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Dropdown>
            <Dropdown title="Workspace">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Dropdown>
            <Dropdown title="Clipboard">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Dropdown>
            <Dropdown title="Template">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Dropdown>
            <button className="searchButton">Search</button>
            <button className="createButton">ceate</button>
            <ProfileImg img={userImg} isNavbar="true" />
          </div>
          <div className="dashMain">

          </div>
        </div>
      </div>
    </>
  );
}
