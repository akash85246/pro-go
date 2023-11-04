import checkImg from "../../assets/Check_ring.svg";
import wCheckImg from "../../assets/whiteCheck_ring.svg";
import { useState } from "react";
export default function PCard(props) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const cardClassName = `pCard ${isButtonClicked ? "clicked" : ""}`;
  const handleCardClick = () => {
    setIsButtonClicked(!isButtonClicked);
    props.onSelect(props.title);
  };
  const buttonClassName = `trialButton ${isButtonClicked ? "clickedB" : ""}`;
  const liClassName = `list ${isButtonClicked ? "clicked" : ""}`;

  return (
    <>
      <div className={cardClassName} onClick={handleCardClick}>
        <h1 className="pTitle">{props.title}</h1>
        <h2 className="cost">
          {props.cost}
          <sup>{props.oldCost}</sup>
        </h2>
        <p>Get key community building features, all in one place </p>
        <button
          className={buttonClassName}
          onClick={() => setIsButtonClicked(!isButtonClicked)}
        >
          Start your 14 Day’s Trails
        </button>
        <h3>Core features:-</h3>
        <ul>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item1}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item2}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item3}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item4}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item5}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item6}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item7}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item8}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item9}</p>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
