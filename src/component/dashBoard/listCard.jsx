import "./listCard.css";
export default function ListCard(props) {
  return (
    <div className="cardContainer">
      <input
        className="cardTitle"
        value={props.name}
        readOnly
        style={{ color: "grey" }}
      ></input>
    </div>
  );
}
