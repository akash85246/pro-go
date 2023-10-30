export default function LeftContainer(props) {
  return (
    <>
      <div className={props.classDiv}>
        <div>
          <h1 className="signUpLine">{props.h1}</h1>
        </div>
        <img src={props.src} className={props.class} alt="Image" />
      </div>
    </>
  );
}
