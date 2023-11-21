import "./listCard.css";
import React, { useState } from "react";
import CardPop from "./cardPop";
export default function ListCard(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleInputClick = () => {
    setIsPopupOpen(true);
  };
  return (
    <>
      <div className="cardContainer">
        <input
          className="cardTitle"
          value={props.name}
          readOnly
          style={{ color: "grey" }}
          onClick={handleInputClick}
        ></input>
      </div>
      {isPopupOpen && (
        <CardPop heading={props.name} onClose={() => setIsPopupOpen(false)} />
      )}
    </>
  );
}
