import React, { useState } from "react";
import "./sidebar.css";
import boardImg from "../../assets/boardImg.svg";
import member from "../../assets/member.svg";
import setting from "../../assets/setting.svg";
import table from "../../assets/table.svg";
import closeSidebarImg from "../../assets/closeSidebar.svg";
import openSidebarImg from "../../assets/openSidebar.svg";
import calender from "../../assets/calender.svg";
import bullet from "../../assets/goBoard.svg";
import flag from "../../assets/Flag.svg";
import wFlag from "../../assets/wFlag.svg";
import Slider from "../utils/slider";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/footer_logo.svg";
import dashbpaord from "../../assets/dashBoardIcon.svg";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
export default function Sidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? "close" : ""}`}>
        <div className="sidebarLogo" onClick={() => navigateTo("/")}>
          {sidebarOpen ? (
            <li>
              <img src={logo} alt="Logo Icon" />
            </li>
          ) : (
            <>
              <img src={logo} alt="Logo" />
              <h2>Pro-Go</h2>
            </>
          )}
        </div>
        <button className="toggleButton" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <img src={openSidebarImg} className="open"></img>
          ) : (
            <img src={closeSidebarImg} className="closeButton"></img>
          )}
        </button>
        <div className="sidebarContain">
          {sidebarOpen ? (
            <img
              src={dashbpaord}
              style={{ width: "1.5rem", marginLeft: "50%" }}
              onClick={() => navigateTo("/dashboard")}
            ></img>
          ) : (
            <h3 onClick={() => navigateTo("/dashboard")}>DashBoard</h3>
          )}

          <ul>
            <li onClick={() => navigateTo("/board")}>
              <img
                src={boardImg}
                alt="Board Icon"
                onClick={() => navigateTo("/board")}
              />
              {!sidebarOpen && <h4>Boards</h4>}
            </li>
            <li>
              <div>
                <img
                  src={member}
                  alt="Member Icon"
                  onClick={() => navigateTo("/member")}
                />
                {!sidebarOpen && (
                  <h4 onClick={() => navigateTo("/member")}>Members</h4>
                )}
              </div>
              {/* {!sidebarOpen && (
                <h4 onClick={() => navigateTo("/member")}>+</h4>
              )} */}
            </li>
            <li>
              <img
                src={setting}
                alt="Setting Icon"
                onClick={() => navigateTo("/setting")}
              />
              {!sidebarOpen && (
                <h4 onClick={() => navigateTo("/setting")}>
                  Workspace setting
                </h4>
              )}
            </li>
          </ul>
          {!sidebarOpen && <h3>Workspace Views</h3>}
          <ul>
            <li>
              <img
                src={table}
                alt="Table Icon"
                onClick={() => navigateTo("/listandcards")}
              />
              {!sidebarOpen && (
                <h4 onClick={() => navigateTo("/listandcards")}>Table</h4>
              )}
            </li>
            <li>
              <img
                src={calender}
                alt="Calendar Icon"
                onClick={() => navigateTo("/calender")}
              />
              {!sidebarOpen && (
                <h4 onClick={() => navigateTo("/calender")}>Calendar</h4>
              )}
            </li>
          </ul>
          {/* {!sidebarOpen && (
            <div>
              <h3>
                <span>Your boards</span>
                <span>+</span>
              </h3>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div className="sidebarButtonContainer">
                <div>
                  <button
                    className="premiumButton"
                    onClick={() => navigateTo("/premium")}
                  >
                    Try Premium Free
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
