import Sidebar from "./sidebar";
import logo from "../../assets/footer_logo.svg";
import "./board.css";
import ProfileImg from "../utils/profileImg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Slider from "../utils/slider";
import { background } from "@chakra-ui/react";
export default function MyBoard(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(props.background);
  return (
    <div className="workspaceContainer">
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
          <ProfileImg isNavbar="true" />
        </div>

        <div
          className="dashMain"
          style={{ background: `url(${props.background})` }}
        ></div>
      </div>
    </div>
  );
}
