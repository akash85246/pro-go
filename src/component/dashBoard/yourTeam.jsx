import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import DashNav from "./dashNavbar";
import { useAuth } from "../utils/authContext";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
import "./yourTeam.css";
export default function YourTeam(props) {
  const [teamDetails, setTeamDetails] = useState([]);
  const [adminDetails, setAdminDetails] = useState({});
  const { authToken, boardId, setAuthToken } = useAuth();
  const [boardMembers, setBoardMembers] = useState([]);
  useEffect(() => {
    axios
      .get("https://pro-go.onrender.com/api/get-all-member", {
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        console.log(response);
        const usersWorkSpaceMember = response.data.usersWorkSpcaeMember || [];
        setTeamDetails(usersWorkSpaceMember);
      })
      .catch((error) => {
        console.error("Error fetching team details:", error);
      });
    axios
      .get(`https://pro-go.onrender.com/api/board/${boardId}/getMembers/`, {
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        console.log(response);
        const boardMembers = response.data.data.members || [];
        setBoardMembers(boardMembers);
      })
      .catch((error) => {
        console.error("Error fetching board members:", error);
      });
    axios
      .get("https://pro-go.onrender.com/api/get-user-details", {
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        console.log(response);
        const adminDetails = response.data.user || {};
        setAdminDetails(adminDetails);
      })
      .catch((error) => {
        console.error("Error fetching admin details:", error);
      });
  }, [authToken]);

  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain">
          <div className="yourTeam">
            <div className="adminContainer">
              <div className="memberImageContainer">
                <img
                  src={
                    adminDetails.photoUrl &&
                    adminDetails.photoUrl.replace(
                      /public/g,
                      "https://pro-go.onrender.com"
                    )
                  }
                  alt={adminDetails.username}
                />
              </div>
              <p className="addName">{adminDetails.username}</p>
              {/* <p>{adminDetails.email}</p> */}
            </div>
            <div className="yourTeamContainer">
              {teamDetails.map((member) => (
                <div key={member.email} className="teamMember">
                  <div className="memberImageContainer">
                    <img
                      src={
                        member.photoUrl &&
                        member.photoUrl.replace(
                          /public/g,
                          "https://pro-go.onrender.com"
                        )
                      }
                      alt={member.username}
                    />
                  </div>
                  <p className="addName">{member.username}</p>
                  {/* <p>{member.email}</p> */}
                </div>
              ))}{" "}
              {boardMembers.map((member) => (
                <div key={member.email} className="boardMember">
                  <div className="memberImageContainer">
                    <img
                      src={
                        member.photoUrl &&
                        member.photoUrl.replace(
                          /public/g,
                          "https://pro-go.onrender.com"
                        )
                      }
                      alt={member.username}
                    />
                  </div>
                  <p className="addName">{member.username}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
