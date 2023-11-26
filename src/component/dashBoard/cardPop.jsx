import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cardPop.css";
import { useAuth } from "../utils/authContext";
import PopOutCard from "./cardPopUp";
import Button from "../utils/button";
import closeImg from "../../assets/closeCreate.svg";
export default function CardPop(props) {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const { authToken, setAuthToken } = useAuth();
  const [data, setData] = useState([]);
  const [isEditingListName, setIsEditingListName] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newListName, setNewListName] = useState("");
  const handleEditListName = () => {
    setIsEditingListName(true);
  };

  useEffect(() => {
    const apiUrl = `https://pro-go.onrender.com/api/list/${props.listId}/cards`;

    const headers = {
      "Content-Type": "application/json",
      "auth-token": authToken,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        fetchListData();
        if (response.data.success) {
          setCardData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        setError("An error occurred while fetching data.");
        console.error("Error fetching data:", error);
      });
  }, [authToken, props.listId]);
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleClose = () => {
    setSelectedCard(null);
  };
  const handleCardDelete = (cardId) => {
    setSelectedCard(null);
    const updatedCards = cardData.cards.filter((card) => card._id !== cardId);
    setCardData((prev) => ({ ...prev, cards: updatedCards }));
  };
  const fetchListData = async () => {
    try {
      const response = await axios.get(
        `https://pro-go.onrender.com/api/list/${props.listId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("List data fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching list data:", error);
    }
  };
  const handleUpdateListName = async () => {
    try {
      const response = await axios.put(
        `https://pro-go.onrender.com/api/list/${props.listId}/update`,
        {
          name: newListName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      if (response.data.status) {
        handleClose();
        props.onClose();
        console.log(response);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred while updating the list name.");
      console.error("Error updating list name:", error);
    }
  };
  return (
    <>
      <div className="cardPopContainer">
        <div>
          <h1>Added Cards</h1>
          <img src={closeImg} onClick={props.onClose} alt="Close Icon"></img>
        </div>
        {cardData && (
          <div className="popCardList">
            {cardData.cards.map((card) => (
              <div
                key={card._id}
                className="popCard"
                onClick={() => handleCardClick(card)}
              >
                <p>Card Title: {card.name}</p>

                {card.description && (
                  <>
                    <p>Description:</p>
                    <textarea
                      className="popDescription"
                      value={card.description}
                      readOnly
                    ></textarea>
                  </>
                )}
                {/* <p>Card ID: {card._id}</p> */}
              </div>
            ))}{" "}
          </div>
        )}
        <div>
          {isEditingListName && (
            <div>
              <input
                type="text"
                placeholder="New List Name"
                value={newListName}
                maxLength={20}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <button className="updateButton" onClick={handleUpdateListName}>
                save
              </button>
            </div>
          )}
        </div>
        <div className="popupbButtons">
          <button onClick={props.onDeleteList}>Delete List</button>
          <button onClick={handleEditListName}>Edit List Name</button>
        </div>

        <div className="sidebarRight"></div>
      </div>
      {selectedCard && (
        <PopOutCard
          card={selectedCard}
          handleClose={handleClose}
          onCardDelete={handleCardDelete}
        />
      )}
    </>
  );
}
