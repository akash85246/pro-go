import "./boardList.css";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import ListCard from "./listCard";
export default function BoardList(props) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cards, setcards] = useState([]);
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
  const { authToken, setAuthToken } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleAddCardSubmit = async () => {
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/api/card/add",
        {
          name: cardTitle,
          boardId: props.boardId,
          listId: props.listId,
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
      const newCardId = response.data.data.respData._id;
      console.log("API Response:", response.data);
      setcards([...cards, { id: newCardId, name: cardTitle }]);
      setIsAddingCard(false);
      setCardTitle("");
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <>
      <div className="boardList" style={{ backgroundColor: props.color }}>
        <h2>{props.listTitle}</h2>
        <div>
          {cards.map((card) => (
            <ListCard
              cardId={card.id}
              name={card.name}
              //  listId={listId} boardId={boardId}
            />
          ))}
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
                <button
                  className="saveListButton"
                  onClick={handleAddCardSubmit}
                >
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
      </div>
    </>
  );
}
