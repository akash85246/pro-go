import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import "./cardPop.css";
import { useAuth } from "../utils/authContext";

export default function CardPop(props) {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const { authToken, setAuthToken } = useAuth();

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = `https://pro-go.onrender.com/api/list/${props.listId}/cards`;

    // Define the headers for the request
    const headers = {
      "Content-Type": "application/json",
      "auth-token": authToken, // Replace with your actual auth token
    };

    // Make the API request using Axios
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        const data = response.data;

        console.log(data);
        if (data.success) {
          setCardData(data);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError("An error occurred while fetching data.");
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <div className="cardPopContainer">
        <h2>{props.heading}</h2>
        <h1>List ID: {props.listId}</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          cardData && (
            <div>
              <div>
                <h1>card Title:cardData.cardTitle</h1>
                <h3>Description: {cardData.description}</h3>
                <button onClick={props.onClose}>Close</button>
                {/* <button onClick={props.onDeleteList}>Delete list</button> */}
              </div>
            </div>
          )
        )}
        <div className="sidebarRight"></div>
      </div>
    </>
  );
}
