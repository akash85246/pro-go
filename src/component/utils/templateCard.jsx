import "./templateCard.css";
export default function TempCard(props) {
  const cardStyle = {
    background: props.background || "#CB7A63",
  };

  if (props.background && props.background.startsWith("#")) {
    cardStyle.backgroundColor = props.background;
    cardStyle.backgroundImage = "none";
  } else if (props.background) {
    cardStyle.backgroundImage = `url(${props.background})`;
    cardStyle.backgroundColor = "transparent";
    cardStyle.backgroundSize = "cover";
  }

  return (
    <>
      <div className="tempCard" style={cardStyle}>
        <h2>{props.tempTitle}</h2>
      </div>
    </>
  );
}
