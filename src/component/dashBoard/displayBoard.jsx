import Sidebar from "./sidebar";
import "./defaultBoard.jsx";
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
export default function MyBoard() {
  const { authToken, setAuthToken } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { boardId, name, background, color } = location.state;
  console.log("location", location.state);
  const [lists, setLists] = useState([]);
  const isColor = background.startsWith("#");
  const backgroundStyle = isColor
    ? { backgroundColor: background }
    : {
        background: `url(${background})`,

        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "150% 200%",
      };

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
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/api/add-recently-worked/",
        {
          name: name,
          link: background,
          color: color,
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
          color: color,
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
        setLoading(true);
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
        setLoading(false);
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
            <div style={{ backdropFilter: "blur(10px)" }}>
              <h1 style={{ color: color }}>Tables </h1>
              <div className="listsContainer">
                {lists.map((list) => (
                  <BoardList
                    key={list.id}
                    listId={list.id}
                    listTitle={list.name}
                    color={list.color}
                    boardId={boardId}
                    setLists={setLists}
                  />
                ))}
                {/* <div key={list.id} className="listItem">
                    {list.name}
                  </div> */}
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
                        <img src={closeArrow} style={{ width: "0.8rem" }}></img>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="addListButton"
                    style={{ backgroundColor: color, padding: "0.3rem " }}
                    onClick={handleAddListClick}
                  >
                    <img src={openArrow} style={{ width: "0.8rem" }}></img>
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
