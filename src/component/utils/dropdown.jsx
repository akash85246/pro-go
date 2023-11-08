import React, { useState } from "react";
import downImg from "../../assets/V.svg";
import upImg from "../../assets/A.svg";

export default function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <span dangerouslySetInnerHTML={{ __html: title }} />
        <span className="arrow-icon">
          {isOpen ? (
            <img src={downImg} alt="down arrow" style={{ height: "1rem" }} />
          ) : (
            <img src={upImg} alt="up arrow" style={{ height: "0.5rem" }} />
          )}
        </span>
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
}
