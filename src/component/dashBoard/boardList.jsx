// boardList.jsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import ListCard from "./listCard";
import CardPop from "./cardPop";
import "./boardList.css";
import { useEffect } from "react";
export default function BoardList(props) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const { authToken, setAuthToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const [cardPopState, setCardPopState] = useState({
    showCardPop: false,
    selectedListId: null,
    heading: null,
  });

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleCloseCard = () => {
    setIsAddingCard(false);
    setCardTitle("");
  };

  const handleListCardClick = (listId) => {
    setCardPopState({
      showCardPop: true,
      selectedListId: listId,
      heading: `Card Details for List ${listId}`,
    });
  };

  const handleCardTitleChange = (event) => {
    setCardTitle(event.target.value);
  };
  const handleCloseCardPop = () => {
    setCardPopState({
      showCardPop: false,
      selectedListId: null,
      heading: null,
    });
  };
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
      setCards((prevCards) => [
        ...(prevCards || []),
        { id: newCardId, name: cardTitle },
      ]);
      setIsAddingCard(false);
      setCardTitle("");
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleInputClick = (listId) => {
    setCardPopState({
      showCardPop: true,
      selectedListId: listId,
    });
  };

  const handleDeleteList = async () => {
    try {
      const apiResponse = await axios.delete(
        `https://pro-go.onrender.com/api/list/${props.listId}/delete`,
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
      // const updatedCards = cards.filter((card) => card.id !== props.listId);
      // setCards(updatedCards);
      if (apiResponse.data.success) {
        const updatedCards = cards.filter((card) => card.id !== props.listId);
        setCards(updatedCards);

        console.log("List deleted successfully");

        handleCloseCardPop();
      } else {
        console.error("Error deleting list:", apiResponse.data.message);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `https://pro-go.onrender.com/api/list/${props.listId}/cards`,
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );
        console.log("my previously added data");
        setCards(response.data.data.cards);
        console.log(response.data.data.cards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [props.listId, authToken]);
  return (
    <>
      <div className="boardList" style={{ backgroundColor: props.color }}>
        <h2>{props.listTitle}</h2>
        <div>
          {cards &&
            cards.map((card) => (
              <ListCard
                key={card.id}
                listId={props.listId}
                cardId={card.id}
                name={card.name}
                onInputClick={handleInputClick}
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

      {cardPopState.showCardPop && (
        <CardPop
          listId={cardPopState.selectedListId}
          heading={cardTitle}
          onClose={handleCloseCardPop}
          onDeleteList={handleDeleteList}
        />
      )}
    </>
  );
}
