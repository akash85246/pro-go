import Sidebar from "./sidebar";
import logo from "../../assets/footer_logo.svg";
import "./displayBoard.css";
import ProfileImg from "../utils/profileImg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Slider from "../utils/slider";
import addIcon from "../../assets/add.svg";
import { background } from "@chakra-ui/react";
import { useAuth } from "../utils/authContext";
import BoardList from "./boardList";
import { useEffect } from "react";
import openArrow from "../../assets/arrowIcon.svg";
import closeArrow from "../../assets/closearrow.svg";
import DashNav from "./dashNavbar.jsx";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
export default function MyBoard() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
  const { authToken, setAuthToken, boardId } = useAuth();
  const [boardInfo, setBoardInfo] = useState({});
  const [lists, setLists] = useState([]);
  const [color, setColor] = useState("#000ff");
  const [name, setName] = useState("");
  const [background, setBackground] = useState("#ffff");

  const isColor = typeof background === "string" && background.startsWith("#");
  const backgroundStyle = isColor
    ? { backgroundColor: background }
    : {
        background: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "150% 200%",
      };

  useEffect(() => {
    const fetchBoardInfo = async () => {
      try {
        const response = await axios.get(
          `https://pro-go.onrender.com/api/board/${boardId}`,
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );

        console.log("Board Info API Response:", response.data);
        const boardColor = response.data.data.board.color;
        setColor(boardColor);
        setBackground(response.data.data.board.templateLink);
        setBoardInfo(response.data.data.board);
        setName(response.data.data.board.name);
      } catch (error) {
        console.error("Error fetching board info:", error);
        console.log("Error response from server:", error);
      }
    };

    fetchBoardInfo();
  }, []);
  const [showInput, setShowInput] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const handleCloseListClick = () => {
    setShowInput(false);
    setListTitle("");
  };
  const handleAddListClick = () => {
    setShowInput(true);
  };

  const addRecentlyWorked = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/api/add-recently-worked/",
        {
          name: name,
          link: background,
          color: color ? color : "#000ff",
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      console.log("add recently worked API Response:", response.data);
    } catch (error) {
      console.log("add recently worked API Response:", name, background, color);
      console.error("Error adding recently worked:", error);
      console.log("Error response from server:", error.response);
    } finally {
      setLoading(false);
    }
  };
  const handleSaveListClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://pro-go.onrender.com/api/list/add",
        {
          name: listTitle,
          boardId: boardId,
          color: color ? color : "#000ff",
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
      addRecentlyWorked();
      console.log("API Response:", response.data);

      const newListItemId = response.data.data.respData._id;
      setLists([...lists, { id: newListItemId, name: listTitle }]);
      console.log("API Response:", response.data);
      console.log("New List Item ID:", newListItemId);
      setShowInput(false);
      setListTitle("");
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
            {error.response?.data?.message || "An error occurred"}
          </Box>
        ),
      });
      console.error("Error adding list:", error);
      console.log("Error response from server:", error.response);
      console.log(boardId);
      console.log(authToken);
      console.log(listTitle);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchLists = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `https://pro-go.onrender.com/api/board/${boardId}/lists`,
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );

        console.log("API Response:", response.data);

        const fetchedLists = response.data.data.lists.map((list) => ({
          id: list._id,
          name: list.name,
        }));

        setLists(fetchedLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
        console.log("Error response from server:", error.response);
      } finally {
        // setLoading(false);
      }
    };

    fetchLists();
  }, [boardId, authToken]);

  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />

        <div className="dashMain">
          <div className="myBoard" style={backgroundStyle}>
            <div>
              <h1 style={{ color: color }}>Tables </h1>
              <div className="listsContainer">
                {lists.map((list) => (
                  <BoardList
                    key={list.id}
                    listId={list.id}
                    listTitle={list.name}
                    color={list.color ? list.color : "#000ff"}
                    boardId={boardId}
                    setLists={setLists}
                  />
                ))}
                {showInput ? (
                  <div
                    className="listInputContainer"
                    style={{ backgroundColor: color }}
                  >
                    <input
                      type="text"
                      placeholder="Enter list title"
                      value={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                      maxLength={30}
                    />
                    <div className="saveButtons">
                      <button
                        className="saveListButton"
                        onClick={handleSaveListClick}
                      >
                        Add list
                      </button>
                      <button className="close" onClick={handleCloseListClick}>
                        <img
                          src={closeArrow}
                          style={{ width: "0.8rem" }}
                          alt="Close"
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="addListButton"
                    style={{ backgroundColor: color, padding: "0.3rem " }}
                    onClick={handleAddListClick}
                  >
                    <img
                      src={openArrow}
                      style={{ width: "0.8rem" }}
                      alt="Open"
                    />
                    Add list
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
