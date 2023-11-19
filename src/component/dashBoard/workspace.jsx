import Sidebar2 from "./sidebar2";
import "./workSpace.css";
import Button from "../utils/button";
import addIcon from "../../assets/addIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import DashNav from "./dashNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function workSpace() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function createFile() {}
  function createNewFolder() {}
  return (
    <div className="workspaceContainer">
      <Sidebar2 selected="home" />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain">
          <div className="addButtons">
            <Button
              type="submit"
              class="addFile"
              label={
                <>
                  <img src={addIcon}></img>
                  <h4>New File</h4>
                </>
              }
              loading={loading}
              onClick={createFile}
            />
            <Button
              type="submit"
              class="addFolder"
              label={
                <>
                  <img src={addIcon}></img>
                  <h4>New Project File</h4>
                </>
              }
              loading={loading}
              onClick={createNewFolder}
            />
          </div>
          <div className="search">
            <div className="SearchContainer1">
              <input
                type="text"
                className="searchbar"
                placeholder="Search all Files"
                maxLength={50}
              ></input>
              {/* <image src={searchIcon}></image> */}
              <Button
                type="submit"
                class="addFile"
                label={
                  <>
                    <img src={searchIcon}></img>
                  </>
                }
                loading={loading}
                onClick={createFile}
              />
            </div>
            <div className="lastView">
              <span>Recent Files</span>
              <span>Last viewed</span>
            </div>
            <div className="result">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
