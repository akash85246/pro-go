import React, { useState } from "react";

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
          <span dangerouslySetInnerHTML={{ __html: "&#11161;" }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: "&#11163;" }} />
        )}
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
}
