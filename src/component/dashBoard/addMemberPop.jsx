import emailIcon from "../../assets/mailIcon.svg";
import Button from "../utils/button";
import closeImg from "../../assets/closeCreate.svg";
import { useState, useEffect } from "react";
import "./addMemberPop.css";
import axios from "axios";
import { useAuth } from "../utils/authContext";
export default function PopUp(props) {
  const { authToken, updateAuthToken, boardId, updateBoardId } = useAuth();

  const handleAddMemberBoard = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `https://pro-go.onrender.com/api/board/${boardId}/addMember`,
        {
          email: email,
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        console.log("Invitation sent successfully");
      } else {
        console.error("Invitation failed:", response.data.message);
      }

      props.closePopup();
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://pro-go.onrender.com/api/add-member",
        {
          email: email,
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      console.log(response.data);

      props.closePopup();
    } catch (error) {
      
      console.error("Error adding member:", error);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div>
      <section className="addMemeberPopUpContainer">
        <div className="head">
          <h1>Invite members</h1>
          <img src={closeImg} onClick={props.closePopup} alt="Close Icon"></img>
        </div>
        <div className="invite">
          <img src={emailIcon}></img>
          <h2>Invite through email</h2>
        </div>
        <input
          type="text"
          maxLength={60}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        {/* <div className="buttons"> */}
        <Button
          type="submit"
          class="addWorkSpace"
          label="add to workspace"
          loading={loading}
          onClick={handleAddMember}
        />
        <Button
          type="submit"
          class="addBoard"
          label="add to board"
          loading={loading}
          onClick={handleAddMemberBoard}
        />
        <div>{/* </div> */}</div>
      </section>
    </div>
  );
}
