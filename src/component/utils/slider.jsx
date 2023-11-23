import React, { useState } from "react";
import downImg from "../../assets/V.svg";
import upImg from "../../assets/A.svg";

export default function Slider({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`slider ${isOpen ? "open" : ""}`}>
      <button className="slider-button" onClick={toggleSlider}>
        <span dangerouslySetInnerHTML={{ __html: title }} />
        <span className="arrow-icon">
          {isOpen ? (
            <img src={upImg} alt="down arrow" style={{ height: "0.6rem" }} />
          ) : (
            <img src={downImg} alt="up arrow" style={{ height: "1.2rem" }} />
          )}
        </span>
      </button>
      {isOpen && <div className="slider-content">{children}</div>}
    </div>
  );
}
