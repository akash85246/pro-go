export default function CardPop(props) {
  return (
    <>
      <div className="cardPopContainer">
        <h2>props.heading</h2>
        <div>
          <div>
            <div>
              <img></img>
              <h3>Description</h3>
            </div>
            <input maxLength={100}></input>
          </div>
          <div className="sidebarRight"></div>
        </div>
      </div>
    </>
  );
}
