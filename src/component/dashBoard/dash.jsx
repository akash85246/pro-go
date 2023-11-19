import logo from "../../assets/footer_logo.svg";
import defaultImg from "../../assets/dashboard.svg";
import userImg from "../../assets/profilePhoto.png";
import { useState } from "react";
import "./dash.css";
import ProfileImg from "../utils/profileImg";
import Sidebar from "./sidebar";
import Slider from "../utils/slider";
import Button from "../utils/button";
import { useNavigate } from "react-router-dom";
export default function DashBoard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function toWorkSpace() {
    navigate("/workspace");
  }
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
          <div className="dashMain">
            <div className="dashCard">
              <div className="default">
                <h1>Create a Project and get organized</h1>
                <img src={defaultImg}></img>
                <div className="dashButtons">
                  <div>
                    <Button
                      type="submit"
                      class="dashButton1"
                      label="+"
                      loading={loading}
                      onClick={toWorkSpace}
                    />
                    <Button
                      type="submit"
                      class="dashButton2"
                      label="Okay Got it !"
                      loading={loading}
                      onClick={toWorkSpace}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
