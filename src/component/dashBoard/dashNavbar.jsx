import React, { useState, useEffect } from "react";
import "./dashNavbar.css"; // Import your CSS file
import ProfileImg from "../utils/profileImg";
import { useAuth } from "../utils/authContext";
import TempCard from "../utils/templateCard";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
export default function DashNav(props) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { authToken, setAuthToken } = useAuth();
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://pro-go.onrender.com/api/search?q=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "auth-token": authToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data.data.boards);
        console.log(data.data.boards);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  const handleTempCardClick = (boardId, name, background, color) => {
    navigate("/listandcards", {
      state: { boardId, name, background, color },
    });
  };
  return (
    <>
      <nav className="navbarDashboard">
        <ul className="navLinks">
          <li>
            <button className="blueButton" onClick={() => navigate("/member")}>
              Create team
            </button>
          </li>
          <li>
            <button className="blueButton">Drafts</button>
          </li>
          <li>
            <button
              className="blueButton"
              onClick={() => navigate("/yourteam")}
            >
              Your team
            </button>
          </li>
          <li>
            <button className="blueButton">Community</button>
          </li>
          <li>
            <button
              className="blueButton"
              onClick={() => navigate("/workspace")}
            >
              Recent
            </button>
          </li>
          <li>
            <button className="blueButton">views</button>
          </li>
          <li>
            <button className="blueButton">High lights</button>
          </li>
          <li className="searchBar">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              maxLength={30}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="searchIcon"></i>
          </li>

          <li>
            <ProfileImg isNavbar="true" />
          </li>
        </ul>
        <div className={searchQuery ? "searchResult" : "hidden"}>
          {searchResults.map((board) => (
            <h3
              onClick={() =>
                handleTempCardClick(
                  board._id,
                  board.name,
                  board.templateLink,
                  board.color
                )
              }
            >
              {board.name}
            </h3>
            // <TempCard
            //   key={board._id}
            //   tempTitle={board.name}
            //   background={board.templateLink}
            //   color={board.color}
            //   onSelect={() =>
            //     handleTempCardClick(
            //       board._id,
            //       board.name,
            //       board.templateLink,
            //       board.color
            //     )
            //   }
            // />
          ))}
        </div>
      </nav>
    </>
  );
}
