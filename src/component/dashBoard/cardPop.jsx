import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cardPop.css";
import { useAuth } from "../utils/authContext";
import PopOutCard from "./cardPopUp";
export default function CardPop(props) {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const { authToken, setAuthToken } = useAuth();
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newListName, setNewListName] = useState("");
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
        console.log("changed sucess fully");
        // Update the list name in the UI
        // fetchListData();
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
        <h1>Added Cards</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          cardData && (
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
              ))}
              <div>
                <input
                  type="text"
                  placeholder="New List Name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
                <button onClick={handleUpdateListName}>Update List Name</button>
              </div>
              <div className="popupbButtons">
                <button onClick={props.onClose}>Close</button>
                <button onClick={props.onDeleteList}>Delete list</button>
              </div>
            </div>
          )
        )}

        <div className="sidebarRight"></div>
      </div>
      {selectedCard && (
        <PopOutCard card={selectedCard} handleClose={handleClose} />
      )}
    </>
  );
}
