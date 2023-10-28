export default function LeftContainer(props) {
  return (
    <>
      <div className={props.classDiv}>
        <h1 className="signUpLine">{props.h1}</h1>
        <img src={props.src} className={props.class} alt="Image" />
      </div>
    </>
  );
}
