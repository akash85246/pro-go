import errorImg from "../../assets/error.svg"
import "./error.css"
export default function Error(){
    return (
      <>
        <div className="errorMain">
          <div className="errorContainer">
            <h1>404 error</h1>
            <h2>We can’t find that page</h2>
            <p>
              Sorry, the page you are looking for doesn't exist or has been
              moved.
            </p>
            <div>
              <button className="primary-button">Go back</button>
              <button className="success-button">Take me home</button>
            </div>
          </div>
          <div className="errorImgContainer">
            <img src={errorImg} className="errorImg"></img>
          </div>
        </div>
      </>
    );
}