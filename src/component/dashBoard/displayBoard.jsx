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
export default function MyBoard() {
  const { authToken, setAuthToken } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { boardId, name, background, color } = location.state;
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

  const handleSaveListClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://pro-go.onrender.com/api/list/add",
        {
          name: listTitle,
          boardId: boardId,
          color: "white",
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

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

  return (
    <div className="workspaceContainer">
      <div className="sidebar">
        <div className="sidebarLogo">
          <img src={logo}></img>
          <h2>Pro-Go</h2>
        </div>
        <Sidebar />
      </div>
      <div className="dashMainContainer">
        <div className="navbarDash">
          <Slider title="Recent">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Slider>
          <Slider title="Open File">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Slider>
          <Slider title="Workspace">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Slider>
          <Slider title="Clipboard">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Slider>
          <Slider title="Template">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Slider>
          <button className="searchButton">Search</button>
          <button className="createButton">create</button>
          <ProfileImg isNavbar="true" />
        </div>

        <div className="dashMain">
          <div className="myBoard" style={backgroundStyle}>
            <div style={{ backdropFilter: "blur(10px)" }}>
              <div className="listsContainer">
                {lists.map((list) => (
                  <BoardList
                    listId={list.id}
                    listTitle={list.name}
                    color={color}
                    boardId={boardId}
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
                        x
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="addListButton"
                    style={{ backgroundColor: color }}
                    onClick={handleAddListClick}
                  >
                    <img src={addIcon} alt="Add Icon" />
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
