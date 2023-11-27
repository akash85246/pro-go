import React, { useEffect, useState } from "react";
import "./workSpace.css";
import Button from "../utils/button";
import addIcon from "../../assets/addIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import DashNav from "./dashNavbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import TempCard from "../utils/templateCard";
import axios from "axios";
import NewBoardPopup from "./createPop";
import Sidebar from "./sidebar";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
export default function WorkSpace() {
  const toast = useToast();
  const [boardsList, setBoardsList] = useState([]);
  const [shareboardsList, setsharetBoardsList] = useState([]);
  const navigate = useNavigate();
  const { authToken, updateAuthToken, boardId, updateBoardId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showNewBoardPopup, setShowNewBoardPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const closeNewBoardPopup = () => {
    setShowNewBoardPopup(false);
  };

  const delayedSearch = (query) => {
    const timeout = setTimeout(() => {
      searchFile(query);
    }, 1000);

    setSearchTimeout(timeout);
  };

  useEffect(() => {
    delayedSearch(searchQuery);
  }, [searchQuery]);
  function searchFile(query) {
    axios
      .get(`https://pro-go.onrender.com/api/search?q=${query}`, {
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        const responseData = response.data.data;
        if (responseData && responseData.boards) {
          setBoardsList(responseData.boards);
        } else {
          console.error("Invalid response structure:", responseData);
        }
      })
      .catch((error) => {
        console.error("Error searching files:", error);
      });
  }

  function createBoard() {
    setShowNewBoardPopup(true);
  }

  const handleTempCardClick = (boardId, name, background, color) => {
    console.log(boardId, name, background, color);
    updateBoardId(boardId);
    navigate("/listandcards", {
      state: { boardId, name, background, color },
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://pro-go.onrender.com/api/board/", {
          method: "GET",
          headers: {
            "auth-token": authToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setsharetBoardsList(data.data.BoardsCollaborated);
          setBoardsList(data.data.BoardsOwned);
        } else {
          console.error("Error fetching user details");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserData();
  }, [authToken]);

  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain">
          <div className="addButtons">
            <Button
              type="submit"
              class="addFile"
              label={
                <>
                  <img src={addIcon} alt="Add" />
                  <h4>New Board</h4>
                </>
              }
              loading={loading}
              onClick={createBoard}
            />
          </div>
          {showNewBoardPopup && (
            <NewBoardPopup
              onClose={closeNewBoardPopup}
              onSubmit={createBoard}
            />
          )}
          <div className="search">
            <div className="SearchContainer1">
              <input
                type="text"
                className="searchbar"
                placeholder="Search all Files"
                maxLength={50}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>
              <Button
                type="submit"
                class="searchFile"
                label={
                  <>
                    <img src={searchIcon} alt="Search" />
                  </>
                }
                onClick={() => searchFile(searchQuery)}
              />
            </div>
            <div className="lastView">
              <span>Recent Files</span>
              <span>Last viewed</span>
            </div>
            <div className="activity">
              {boardsList &&
                boardsList.map((board) => (
                  <TempCard
                    key={board._id}
                    tempTitle={board.name}
                    background={board.templateLink}
                    color={board.color}
                    onSelect={() =>
                      handleTempCardClick(
                        board._id,
                        board.name,
                        board.templateLink,
                        board.color
                      )
                    }
                  />
                ))}
              {shareboardsList &&
                shareboardsList.map((board) => (
                  <TempCard
                    key={board._id}
                    tempTitle={board.name}
                    background={board.templateLink}
                    color={board.color}
                    onSelect={() =>
                      handleTempCardClick(
                        board._id,
                        board.name,
                        board.templateLink,
                        board.color
                      )
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
