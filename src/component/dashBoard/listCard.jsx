import "./listCard.css";
import React, { useState } from "react";
export default function ListCard(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleInputClick = () => {
    setIsPopupOpen(true);
    props.onInputClick(props.listId);
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
    </>
  );
}
