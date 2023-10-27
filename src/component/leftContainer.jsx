export default function LeftContainer(props){
    return (
      <>
        <div className={props.classDiv}>
          <h1 className="signUpLine">{props.h1}</h1>
          <img src={props.src} className="loginImage" alt="Image" />
        </div>
      </>
    );
}