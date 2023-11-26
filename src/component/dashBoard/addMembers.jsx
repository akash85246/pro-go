import DashNav from "./dashNavbar";
import Sidebar2 from "./sidebar2";
import "./addMember.css";
import axios from "axios";
import PopUp from "./addMemberPop";
import ProfileImg from "../utils/profileImg";
import include from "../../assets/User_add_alt.svg";
import { useState } from "react";
import { useAuth } from "../utils/authContext";
import Sidebar from "./sidebar";
export default function Member() {
  const [inviteStatus, setInviteStatus] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const { authToken, setAuthToken, boardId } = useAuth();

  const handleButtonClick = () => {
    setShowInput(true);
  };
  const closePopup = () => {
    setShowInput(false);
  };
  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain">
          <div className="profileContainerWorkspace">
            <div>
              <div>
                <ProfileImg isNavbar="true" />
              </div>
              <h2>
                <span>username </span>
                's workspace
              </h2>
            </div>
            <div>
              {/* <div className="blue-button-container" onClick={handleInvite}>
                <img src={include}></img>
                <span>Invite Workspace members</span>
              </div> */}
              <div className="inviteButtons">
                {showInput && <PopUp closePopup={closePopup} />}
                <button
                  className="blue-button-container"
                  onClick={handleButtonClick}
                >
                  <img src={include} alt="Add Icon" />
                  <span>Invite members</span>
                </button>

                {inviteStatus && <p>{inviteStatus}</p>}
              </div>
            </div>
          </div>
          <div className="memberContainer">
            <div>
              <h2>Members</h2>
              <h3>Members of Workspace boards</h3>
              <a>Pending</a>
              <a>Workspace members(1)</a>
              <a>Guests</a>
              <a>Ratings</a>
            </div>
            <div>
              <div>
                <h3>Workspace members(1)</h3>
                <p>
                  Workspace members can view and join all Workspace visible
                  boards and create new boards in the Workspace.
                </p>
              </div>
              <div>
                <h3>Invite members to join you</h3>
                <p>
                  Anyone with an invite link can join this Free Workspace. You
                  can also disable and create a new invite link for this
                  Workspace at any time.
                </p>
              </div>
              <div>
                <button className="filterButton">Filter by Name</button>
              </div>
              <div>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
                <h1>I am a list of members</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
