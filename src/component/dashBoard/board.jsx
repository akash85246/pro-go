import React, { useState } from "react";
import Sidebar from "./sidebar";
import "./board.css";
import Button from "../utils/button";
import DashNav from "./dashNavbar";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/searchIcon.svg";
import TempCard from "../utils/templateCard";
import abstractImg from "../../assets/abstract.jpg";
import splashImg from "../../assets/colorSplash.jpg";
import flowformImg from "../../assets/flowform.jpg";
import jamImg from "../../assets/jam.jpg";
import mosaicImg from "../../assets/mosaic.jpg";
import naturalImg from "../../assets/natural.jpg";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
export default function Board() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyWorked, setRecentlyWorked] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const templates = [
    { tempTitle: "Default", background: "#ffff", color: "blue" },
    { tempTitle: "Abstract", background: abstractImg, color: "#0000FF" },
    { tempTitle: "Color Splash", background: splashImg, color: "#FF0000" },
    { tempTitle: "Flowform", background: flowformImg, color: "blue" },
    { tempTitle: "Jam", background: jamImg, color: "grey" },
    { tempTitle: "Mosaic", background: mosaicImg, color: "black" },
    { tempTitle: "Natural", background: naturalImg, color: "#006400" },
    { tempTitle: "Violet", background: "#9400D3", color: "#9400D3" },
    { tempTitle: "Blue", background: "#0000FF", color: "#0000FF" },
    { tempTitle: "Indigo", background: "#4B0082", color: "#4B0082" },
    { tempTitle: "Green", background: "#00FF00", color: "#00FF00" },
    { tempTitle: "Yellow", background: "#FFFF00", color: "#FFFF00" },
    { tempTitle: "Red", background: "#FF0000", color: "#FF0000" },
  ];
  const { authToken, updateAuthToken, boardId, updateBoardId } = useAuth();
  console.log("current boardId", boardId);
  const updateBoard = async () => {
    try {
      setLoading(true);

      if (selectedTemplate) {
        const response = await axios.patch(
          `https://pro-go.onrender.com/api/board/${boardId}/update`,
          {
            templateLink: selectedTemplate.background,
            templateName: selectedTemplate.tempTitle,
            color: selectedTemplate.color,
          },
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );

        const data = response.data;

        if (data.status) {
          console.log("Board updated successfully");
          navigate("/listandcards", {
            state: {
              boardId: boardId,
              name: selectedTemplate.tempTitle,
              background: selectedTemplate.background,
              color: selectedTemplate.color,
            },
          });
        } else {
          console.error("Board update failed");
        }
      } else {
        console.error("selectedTemplate is null");
      }
    } catch (error) {
      console.error("Error updating board", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecentlyWorked = async () => {
      try {
        const response = await axios.get(
          "https://pro-go.onrender.com/api/get-recently-worked",
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );

        const data = response.data;

        if (data.success) {
          setRecentlyWorked(data.recentlyWorked);
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchRecentlyWorked();
  }, [authToken, selectedTemplate]);

  const addRecentlyViewed = async () => {
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/api/add-recently-viewed/",
        {
          link: selectedTemplate.background,
          name: selectedTemplate.tempTitle,
          color: selectedTemplate.color,
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      console.log("API Response:", response.data);
      console.log("selected", selectedTemplate);
      updateBoard();
    } catch (error) {
      console.log("selected", selectedTemplate);
      console.error("Error adding recently viewed:", error);
      console.log("Error response from server:", error.response);
    }
  };
  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const response = await axios.get(
          "https://pro-go.onrender.com/api/get-recently-viewed",
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );

        const data = response.data;

        if (data.success) {
          console.log(data.recentlyViewed);
          setRecentlyViewed(data.recentlyViewed);
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchRecentlyViewed();
  }, [selectedTemplate, authToken]);

  const filteredTemplates = templates.filter((template) =>
    template.tempTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleTemplateClick = (template) => {
    if (
      template &&
      template.tempTitle &&
      template.background &&
      template.color
    ) {
      setSelectedTemplate((prevTemplate) => {
        console.log(
          "template details",
          template.tempTitle,
          template.background,
          template.color
        );

        addRecentlyViewed();
        updateBoard();
        return template;
      });
    } else {
      console.error("Invalid template object:", template);
    }
  };

  const handleRecentTemplateClick = (template) => {
    setSelectedTemplate(template);

    console.log(
      "template details",
      template.tempTitle,
      template.background,
      template.color
    );
    updateBoard();
  };

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>

              <Button
                type="submit"
                class="addFile"
                label={
                  <>
                    <img src={searchIcon} alt="Search"></img>
                  </>
                }
                // loading={loading}
                // onClick={createFile}
              />
            </div>
          </div>
          <div className="tempContainer">
            <div className="popTemp">
              <h2>Most popular templates</h2>
              <div className="scrollContainer">
                {filteredTemplates.map((template, index) => (
                  <TempCard
                    key={index}
                    tempTitle={template.tempTitle}
                    background={template.background}
                    color={template.color}
                    onSelect={handleTemplateClick}
                  />
                ))}
              </div>
            </div>
            <div className="recentTemp">
              <h2>Recently viewed</h2>
              <div className="scrollContainer">
                {recentlyViewed.map((template, index) => (
                  <TempCard
                    key={index}
                    tempTitle={template.name}
                    background={template.link}
                    color={template.color}
                    onSelect={handleRecentTemplateClick}
                  />
                ))}
              </div>
            </div>
            <div className="reboTemp">
              <h2>Recent Board</h2>
              <div className="scrollContainer">
                {recentlyWorked.map((template, index) => (
                  <TempCard
                    key={index}
                    tempTitle={template.name}
                    background={template.link}
                    color={template.color}
                    onSelect={handleRecentTemplateClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
