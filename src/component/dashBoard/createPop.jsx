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
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import "./createPop.css";
import Button from "../utils/button";
export default function NewBoardPopup({ onClose, onSubmit }) {
  const toast = useToast();
  const [boardName, setBoardName] = useState("");
   const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
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
  const { authToken, setAuthToken } = useAuth();

  const createBoardOnServer = async (boardName, templateColor) => {
    console.log("mine", templateColor);
    setLoading(true);
    try {
      const apiUrl = "https://pro-go.onrender.com/api/board/add";
      const templateBackground = selectedTemplate
        ? selectedTemplate.background
        : null;
      const response = await axios.post(
        apiUrl,
        {
          name: boardName,
          templateLink: templateBackground,
          color: templateColor,
        },
        { headers: { "auth-token": authToken } }
      );

      if (
        response.status === 201 &&
        response.data &&
        response.data.data &&
        response.data.data.respData
      ) {
        console.log(
          "Board created successfully:",
          response.data.data.respData._id
        );
        console.log({
          boardId: response.data.data.respData._id,
          name: boardName,
          background: selectedTemplate.background,
          color: selectedTemplate.color,
        });
        navigate("/listandcards", {
          state: {
            boardId: response.data.data.respData._id,
            name: boardName || Math.floor(Math.random() * 100) + 1,
            background: selectedTemplate.background,
            color: selectedTemplate.color,
          },
        });
      } else {
        console.error("Error creating board:", response.data);
      }
    } catch (error) {
      toast({
        title: "Error Notification!",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
        position: "top-centre",
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box p={3} color="white" bg="red.500" borderRadius="md">
            <WarningIcon mr={3} />
            {error.response.data.message || "An error occurred"}
          </Box>
        ),
      });
      setLoading(false);
      console.error("An error occurred:", error);
    }
  };

  const handleInputChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    console.log(template);
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
      const templateColor = selectedTemplate.color;
      createBoardOnServer(boardName, templateColor);
    } else {
      console.error("Please select a template");
      toast({
        title: "Error Notification!",
        description: "An error occurred",
        status: "error",
        position: "top-centre",
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box p={3} color="white" bg="red.500" borderRadius="md">
            <WarningIcon mr={3} />
            {"Please select a template"}
          </Box>
        ),
      });
    }
  };

  return (
    <div className="popupContainer">
      <div className="popup">
        <h2>Create board</h2>
        <h3>Background</h3>
        {/* <div className="themeBackground">
          {templates.map((template, index) => (
            <TempCard
              key={index}
              {...template}
              onSelect={handleTemplateSelect}
              selected={selectedTemplate === template}
            />
          ))}
        </div> */}
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
          <Button
            type="submit"
            class="create"
            label="Create"
            loading={loading}
            onClick={handleSubmit}
          />
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
