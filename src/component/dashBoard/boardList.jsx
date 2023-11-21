import "./boardList.css";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import { useNavigate, useLocation } from "react-router-dom";
export default function BoardList(props) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleCloseCard = () => {
    setIsAddingCard(false);
    setCardTitle("");
  };

  const handleCardTitleChange = (event) => {
    setCardTitle(event.target.value);
  };

  const handleAddCardSubmit = async () => {
    const { authToken, setAuthToken } = useAuth();
    const location = useLocation();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/api/card/add",
        {
          name: cardTitle,
          boardId: "6552213f7429e72f05b8da20",
          listId: "655223b3327866c64ccef9eb",
          order: "mnbv",
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      console.log("API Response:", response.data);

      // Handle success, update state or perform any other actions as needed
      setIsAddingCard(false);
      setCardTitle("");
    } catch (error) {
      console.error("Error adding card:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <>
      <div className="boardList" style={{ backgroundColor: props.color }}>
        <h2>{props.listTitle}</h2>
        {isAddingCard ? (
          <div>
            <input
              type="text"
              placeholder="Enter card title"
              value={cardTitle}
              onChange={handleCardTitleChange}
              className="inputCardTitle"
            />
            <div className="saveButtons">
              <button className="saveListButton" onClick={handleAddCardSubmit}>
                Add card
              </button>
              <button onClick={handleCloseCard}>x</button>
            </div>
          </div>
        ) : (
          <button className="addCardButton" onClick={handleAddCardClick}>
            <span>+</span>
            <span> Add card</span>
          </button>
        )}
      </div>
    </>
  );
}
