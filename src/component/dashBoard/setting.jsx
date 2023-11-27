import "./setting.css";
import DashNav from "./dashNavbar";
import protectedImg from "../../assets/protected.svg";
import starImg from "../../assets/Star.svg";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
export default function Setting() {
  const navigate = useNavigate();
  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain">
          <div className="settingContainer">
            <h1>Settings</h1>
            <div className="settingMain">
              <div>
                <h3>Workspace settings</h3>
                <h4>Workspace visibility</h4>
              </div>
              <div>
                <div>
                  <img src={protectedImg}></img>
                  <p>
                    Private - This Workspace is private. It's not indexed or
                    visible to those outside the Workspace.
                  </p>
                </div>
                <button className="changeButton">Change</button>
              </div>
              <div>
                <img className="starImg" src={starImg}></img>
                <div>
                  <h4>Upgrade to Premium for more settings</h4>
                  <button
                    className="changeButton"
                    onClick={() => navigate("/price")}
                  >
                    Change
                  </button>
                </div>
                <ul className="">
                  <li>Upgrade to Premium for more settings</li>
                  <li>Board creation restrictions</li>
                  <li>Board deletion restrictions</li>
                  <li>Sharing boards with guests</li>
                </ul>
              </div>
              <div>
                <p className="delete">Delete this workspace?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
