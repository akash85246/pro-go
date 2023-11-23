import React, { useEffect, useState } from "react";
import axios from "axios";
// import faker from "faker";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

export default function DefaultBoard() {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const { authToken, setAuthToken } = useAuth();

  useEffect(() => {
    generateRandomName();
    createBoardOnServer();
  }, []);

  const generateRandomName = () => {
    let randomName = faker.name.findName();

    while (randomName.length <= 6) {
      randomName = faker.name.findName();
    }
    setBoardName(randomName);
  };

  const createBoardOnServer = async () => {
    try {
      const apiUrl = "https://pro-go.onrender.com/api/board/add";

      const response = await axios.post(
        apiUrl,
        {
          name: generateRandomName(),
          templateLink: "#ffff",
          color: "blue",
        },
        { headers: { "auth-token": authToken } }
      );

      if (response.status === 201 && response.data.success) {
        console.log(
          "Board created successfully:",
          response.data.data.respData._id
        );
        navigate("/listandcards", {
          state: {
            boardId: response.data.data.respData._id,
            name: boardName,
            background: "#ffff",
            color: "blue",
          },
        });
      } else {
        console.error("Error creating board:", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return <></>;
}
