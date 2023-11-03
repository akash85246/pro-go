import React, { useState } from "react";
import downImg from "../../assets/V.svg";
export default function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <span dangerouslySetInnerHTML={{ __html: title }} />
        {isOpen ? (
          <span>
            <img src={downImg}></img>
          </span>
        ) : (
          <span>{/* <img src={upImg}></img> */}^</span>
        )}
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
}
