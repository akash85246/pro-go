import logo from "../../assets/footer_logo.svg";
import defaultImg from "../../assets/dashboard.svg";
import DashNav from "./dashNavbar";
import { useState } from "react";
import "./dash.css";
import ProfileImg from "../utils/profileImg";
import Sidebar from "./sidebar";
import Slider from "../utils/slider";
import Button from "../utils/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function DashBoard() {
  const toast = useToast();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function toWorkSpace() {
    navigate("/workspace");
  }
  return (
    <>
      <div className="workSpaceContainer">
        <Sidebar />

        <div className="dashMainContainer">
          <DashNav />
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
