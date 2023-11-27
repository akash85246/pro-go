import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import ListCard from "./listCard";
import CardPop from "./cardPop";
import "./boardList.css";
import { useEffect } from "react";
import openArrow from "../../assets/arrowIcon.svg";
import closeArrow from "../../assets/closearrow.svg";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
export default function BoardList(props) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const { authToken, setAuthToken } = useAuth();
    const toast = useToast();
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
    fetchCards();
  };
  const handleAddCardSubmit = async () => {
    setLoading(true);
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
    } catch (error) {toast({
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
      console.error("Error adding card:", error);
    }finally{
      setLoading(false);
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

      if (apiResponse.data.success) {
        const updatedCards = cards.filter((card) => card.id !== props.listId);
        setCards(updatedCards);

        console.log("List deleted successfully");
        props.setLists((prevLists) =>
          prevLists.filter((list) => list.id !== props.listId)
        );
        handleCloseCardPop();
      } else {toast({
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
        console.error("Error deleting list:", apiResponse.data.message);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };
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
  useEffect(() => {
    fetchCards();
  }, [props.listId, authToken]);
  return (
    <>
      <div
        className="boardList"
        style={{ borderTop: "20px solid " + props.color }}
      >
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
                <button onClick={handleCloseCard}>
                  <img src={closeArrow} style={{width:"0.8rem"}}></img>
                </button>
              </div>
            </div>
          ) : (
            <button
              //  className="addCardButton"
              onClick={handleAddCardClick}
            >
              <img src={openArrow} style={{width:"0.8rem"}}></img>
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
