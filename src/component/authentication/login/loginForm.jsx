import React, { useEffect, useState } from "react";
import ProgressBar from "../../utils/progress";
import RememberMeCheckbox from "../../utils/rememberMe";
import Button from "../../utils/button";
import LeftContainer from "../../utils/leftContainer";
import axios from "axios";
import loginImg from "../../../assets/logIn.svg";
import eyeImg from "../../../assets/eye.svg";
import eyeHidImg from "../../../assets/eye-hide.svg";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css";

const loginEndpoint = "https://pro-go.onrender.com/api/auth/sign-in";
// import { useAuth } from "../../utils/authContext";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  function validateEmail(inputEmail) {
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailCheck.test(inputEmail) && inputEmail !== "") {
      document.querySelector(".error").style.display = "block";

      if (!inputEmail.includes("@") && !inputEmail.includes(".")) {
        setEmailError("Missing '@' and '.' in the email");
      } else if (!inputEmail.includes("@")) {
        setEmailError("Missing '@' in the email");
      } else if (!inputEmail.includes(".")) {
        setEmailError("Missing '.' in the email");
      } else {
        setEmailError("**Invalid Email");
      }
    } else {
      document.querySelector(".error").style.display = "none";
      setEmailError("");
      setEmail(inputEmail);
    }
  }

  function validatePassword(inputPassword) {
    return inputPassword.length >= 5 && inputPassword.length <= 20;
  }

  function validatePhoneNumber(inputPhoneNumber) {
    const numberCheck = /^[789]\d{9}/;

    if (!numberCheck.test(inputPhoneNumber) && inputPhoneNumber !== "") {
      document.querySelector(".error").style.display = "block";
      setPhoneError(
        "**Phone Number should start with 7/8/9 and should have 10 digits, no characters allowed"
      );
    } else {
      document.querySelector(".error").style.display = "none";
      setPhoneError("");
      setPhoneNumber(inputPhoneNumber);
    }
  }

  function handleForgotPassword() {
    setForgotPassword(true);
    navigate("/forgot");
  }

  function handleSignUp() {
    setShowSignUp(true);
    navigate("/signUp");
  }
  // useEffect(() => {
  //   let login = localStorage.getItem("login");
  //   if (login) {
  //     navigate("/home");
  //   }
  // });
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit button clicked");
    if (
      (loginWithPhone && phoneError) ||
      (!loginWithPhone && emailError) ||
      !validatePassword(password)
    ) {
      alert("Please enter correct details");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        loginEndpoint,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: false,
        }
      );
      const authToken = response.data.data.token;

      localStorage.setItem("authToken", authToken);

      setAuthToken(authToken);

      console.log("Received auth token:", authToken);

      if (response.data.success) {
        console.log("verified");
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server responded with an error:", error.response.data);
        console.log(error.response.data);
        // toast.error(error.response.data.message);

        if (error.response.data.message === "No user exists with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:");
      } else {
        console.error("Error setting up the request:");
      }
    } finally {
      setLoading(false);
    }
  }

  function eye() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="navbar">
          <img src={logo}></img>
        </div>
        <div className="container">
          <LeftContainer
            classDiv="loginContainer left"
            src={loginImg}
            class="loginImage"
            // h1="Login on cloud today, tomorrow, or from any location"
          />
          <div className="loginContainer right log">
            <ProgressBar circleCount={4} color={1} />
            <div>
              <h1>Account Login</h1>

              <p className="light">
                If you are already a member, you can log in with your{" "}
                {loginWithPhone ? "phone number" : "email address"} and password
              </p>
            </div>
            {/* <div className="entry">
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space between",
                  alignItems: "center",
                }}
              > {" "}
            */}
            <div className="Input">
              <label className="light">
                {loginWithPhone ? "Phone number" : "Email address"}
              </label>
              <input
                type="text"
                className="input"
                onChange={(event) => {
                  validateEmail(event.target.value);
                }}
                maxLength={loginWithPhone ? 10 : 50}
                required
              />
            </div>
            {/* </div> */}
            {/* </div> */}
            <div className="errorContainer1" style={{ display: "block" }}>
              <span className="error">Invalid Email</span>
            </div>
            <div className="Input">
              <label className="light">Password</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="password input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  maxLength={15}
                  minLength={6}
                  required
                />
                <div className="show" onClick={eye}>
                  <img
                    src={showPassword ? eyeHidImg : eyeImg}
                    height={"25px"}
                    alt="show password"
                  />
                </div>
              </div>
            </div>
            <RememberMeCheckbox class="signInCheckbox" divClass="remember" />
            <div>
              <Button
                type="submit"
                class="submit button"
                label="LOG IN"
                loading={loading}
              />
            </div>
            <div className="lowNavigate">
              <span className=" light" onClick={handleForgotPassword}>
                Forgot Password
              </span>
              <span className="blue " onClick={handleSignUp}>
                {" "}
                Sign up here
              </span>
            </div>
          </div>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </>
  );
}

export default LoginForm;
