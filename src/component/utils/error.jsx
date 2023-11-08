import errorImg from "../../assets/error.svg";
import "./error.css";
import { useNavigate } from "react-router-dom";

export default function Error() {
  function goBack() {
    window.history.back();
  }
  const navigate = useNavigate();
  function goToHome() {
    navigate("/home");
  }

  return (
    <>
      <div className="errorMain">
        <div className="errorContainer">
          <h1>404 error</h1>
          <h2>We can’t find that page</h2>
          <p>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div>
            <button className="primary-button" onClick={goBack}>
              Go back
            </button>
            <button className="success-button" onClick={goToHome}>
              Take me home
            </button>
          </div>
        </div>
        <div className="errorImgContainer">
          <img src={errorImg} className="errorImg"></img>
        </div>
      </div>
    </>
  );
}
