export default function Features(props) {
  return (
    <>
      <div className="featureContainer">
        <img src={props.image} className="featureImage"></img>
        <p>{props.text}</p>
      </div>
    </>
  );
}
