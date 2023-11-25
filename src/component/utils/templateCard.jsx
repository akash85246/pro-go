import React from "react";
import "./templateCard.css";

export default function TempCard({
  tempTitle,
  background,
  color,
  onSelect,
  selected1,
}) {
  const cardStyle = {
    background: background === "#ffff" ? "blue" : background || "#CB7A63",
  };

  if (background && background.startsWith("#")) {
    cardStyle.backgroundColor = background;
    cardStyle.backgroundImage = "none";
  } else if (background) {
    cardStyle.backgroundImage = `url(${background})`;
    cardStyle.backgroundColor = "transparent";
    cardStyle.backgroundSize = "cover";
  }

  return (
    <div
      className={`tempCard ${tempTitle == selected1 ? "selected1" : ""}`}
      onClick={() => onSelect({ tempTitle, background, color })}
      style={cardStyle}
    >
      <h2>{tempTitle}</h2>
    </div>
  );
}
