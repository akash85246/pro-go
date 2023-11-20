import React, { useState } from "react";
import TempCard from "../utils/templateCard";
import abstractImg from "../../assets/abstract.svg";
import splashImg from "../../assets/colorSplash.svg";
import flowformImg from "../../assets/flowform.svg";
import jamImg from "../../assets/jam.svg";
import mosaicImg from "../../assets/mosaic.svg";
import naturalImg from "../../assets/natural.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import axios from "axios";

import "./createPop.css";

export default function NewBoardPopup({ onClose, onSubmit }) {
  const [boardName, setBoardName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const templates = [
    { tempTitle: "Abstract", background: abstractImg, color: "blue" },
    { tempTitle: "Color Splash", background: splashImg, color: "#FF0000" },
    { tempTitle: "Flowform", background: flowformImg, color: "blue" },
    { tempTitle: "Jam", background: jamImg, color: "grey" },
    { tempTitle: "Mosaic", background: mosaicImg, color: "black" },
    { tempTitle: "Natural", background: naturalImg, color: "dark-green" },
    { tempTitle: "Violet", background: "#9400D3", color: "#9400D3" },
    { tempTitle: "Blue", background: "#0000FF", color: "#0000FF" },
    { tempTitle: "Indigo", background: "#4B0082", color: "#4B0082" },
    { tempTitle: "Green", background: "#00FF00", color: "#00FF00" },
    { tempTitle: "Yellow", background: "#FFFF00", color: "#FFFF00" },
    { tempTitle: "Red", background: "#FF0000", color: "#FF0000" },
  ];
  const { authToken, setAuthToken } = useAuth();

  const createBoardOnServer = async (boardName, templateColor) => {
    try {
      const apiUrl = "https://pro-go.onrender.com/api/board/add";
      const templateBackground = selectedTemplate
        ? selectedTemplate.background
        : null;
      const response = await axios.post(
        apiUrl,
        { name: boardName, templateLink: templateBackground, templateColor },
        { headers: { "auth-token": authToken } }
      );

      if (response.status === 201 && response.data.success) {
        console.log("Board created successfully:", response.data.data.respData);
        navigate("/myboard", {
          state: {
            name: boardName,
            background: selectedTemplate.background,
            color: templateColor,
          },
        });
      } else {
        console.error("Error creating board:", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleInputChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
      const templateColor = selectedTemplate.color;
      createBoardOnServer(boardName, templateColor);
    } else {
      console.error("Please select a template");
    }
  };

  return (
    <div className="popupContainer">
      <div className="popup">
        <h2>Create board</h2>
        <h3>Background</h3>
        <div className="themeBackground">
          {templates.map((template, index) => (
            <TempCard
              key={index}
              {...template}
              onSelect={handleTemplateSelect}
              selected={selectedTemplate === template}
            />
          ))}
        </div>
        <div>
          <label htmlFor="boardName">Board Title</label>
          <input
            type="text"
            id="boardName"
            value={boardName}
            onChange={handleInputChange}
            maxLength={30}
          />
        </div>
        <div className="popButton">
          <button onClick={handleSubmit}>Create</button>
          <button onClick={() => navigate("/board")}>
            Start with template
          </button>
          <p>
            This Workspace has 7 boards remaining. Free Workspaces can only have
            10 open boards. For unlimited boards, upgrade your Workspace.
          </p>
          <button onClick={() => navigate("/price")}>Start free trial</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
