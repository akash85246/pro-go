import Sidebar from "./sidebar";
import "./board.css";
import Button from "../utils/button";
import DashNav from "./dashNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import TempCard from "../utils/templateCard";
import abstractImg from "../../assets/abstract.svg";
import splashImg from "../../assets/colorSplash.svg";
import flowformImg from "../../assets/flowform.svg";
import jamImg from "../../assets/jam.svg";
import mosaicImg from "../../assets/mosaic.svg";
import naturalImg from "../../assets/natural.svg";

export default function Board() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const templates = [
    { tempTitle: "Abstract", background: abstractImg },
    { tempTitle: "Color Splash", background: splashImg },
    { tempTitle: "Flowform", background: flowformImg },
    { tempTitle: "Jam", background: jamImg },
    { tempTitle: "Mosaic", background: mosaicImg },
    { tempTitle: "Natural", background: naturalImg },
    { tempTitle: "Violet", background: "#9400D3" },
    { tempTitle: "Blue", background: "#0000FF" },
    { tempTitle: "Indigo", background: "#4B0082" },
    { tempTitle: "Green", background: "#00FF00" },
    { tempTitle: "Yellow", background: "#FFFF00" },
    { tempTitle: "Red", background: "#FF0000" },
  ];
  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />

        <div className="dashMain">
          <div className="search2">
            <div className="SearchContainer2">
              <input
                type="text"
                className="searchbar2"
                placeholder="Search all Files"
                maxLength={50}
              ></input>

              <Button
                type="submit"
                class="addFile"
                label={
                  <>
                    <img src={searchIcon}></img>
                  </>
                }
                loading={loading}
                  // onClick={createFile}
              />
            </div>
          </div>
          <div className="tempContainer">
            <div className="popTemp">
              <h2>Most popular templates</h2>
              <div className="scrollContainer">
                {templates.map((template, index) => (
                  <TempCard key={index} {...template} />
                ))}
              </div>
            </div>
            <div className="recentTemp">
              <h2>Recently viewed</h2>
              <div className="scrollContainer">
                {templates.map((template, index) => (
                  <TempCard key={index} {...template} />
                ))}
              </div>
            </div>
            <div className="reboTemp">
              <h2>Recent Board</h2>
              <div className="scrollContainer">
                {templates.map((template, index) => (
                  <TempCard key={index} {...template} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
