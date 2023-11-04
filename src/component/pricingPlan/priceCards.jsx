import checkImg from "../../assets/Check_ring.svg";

export default function PCard(props) {
  return (
    <>
      <div className="pCard">
        <h1 className="pTitle">{props.title}</h1>
        <h2 className="cost">{props.cost}</h2>
        <p>Get key community building features, all in one place </p>
        <button className="trialButton">Start your 14 Day’s Trails</button>
        <h3>Core features:-</h3>
        <ul>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item1}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item2}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item3}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item4}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item5}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item6}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item7}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item8}</p>
            </span>
          </li>
          <li>
            <span>
              <img src={checkImg}></img>
            </span>
            <span>
              <p>{props.item1}</p>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
