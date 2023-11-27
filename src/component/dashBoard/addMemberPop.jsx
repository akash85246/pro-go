import emailIcon from "../../assets/mailIcon.svg";
import Button from "../utils/button";
import closeImg from "../../assets/closeCreate.svg";
import { useState, useEffect } from "react";
import "./addMemberPop.css";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
export default function PopUp(props) {
  const { authToken, updateAuthToken, boardId, updateBoardId } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [teamDetails, setTeamDetails] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  function validateEmail(inputEmail) {
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const [emailError, setEmailError] = useState("");
    if (!emailCheck.test(inputEmail) && inputEmail !== "") {
      document.querySelector(".error").style.display = "block";

      if (!inputEmail.includes("@") && !inputEmail.includes(".")) {
        setEmailError("Missing '@' and '.' in the email");
      } else if (!inputEmail.includes("@")) {
        setEmailError("Missing '@' in the email");
      } else if (!inputEmail.includes(".")) {
        setEmailError("Missing '.' in the email");
      } else {
        setEmailError("**Invalid Email");
      }
    } else {
      document.querySelector(".error").style.display = "none";
      setEmailError("");
      setEmail(inputEmail);
    }
  }
  const handleAddMemberBoard = async () => {
    try {
      setLoading1(true);

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
      console.error("Error adding member:", error);
    } finally {
      setLoading1(false);
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
      console.error("Error adding member:", error);
    } finally {
      setLoading(false);
    }
  };
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
        {/* <div style={{ display: "block" }}>
          <span>Invalid Email</span>
        </div> */}
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
          loading={loading1}
          onClick={handleAddMemberBoard}
        />
        <div>{/* </div> */}</div>
      </section>
    </div>
  );
}
