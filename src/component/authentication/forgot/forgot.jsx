import React, { useState } from "react";
import Button from "../button";
import ProgressBar from "../progress";
import Reset from "../reset/resetPassword";
import LeftContainer from "../leftContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import forgetImg from "../../../assets/verification.svg";
// import { toast } from "react-toastify";
// import "../../../../node_modules/react-toastify/dist/ReactToastify.css";

export default function Forgotten(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailEndpoint = "https://pro-go.onrender.com/api/auth/forget-password";

  function validateEmail(inputEmail) {
    const emailCheck = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailCheck.test(inputEmail) && inputEmail !== "") {
      document.querySelector("#numberError").style.display = "block";
      setEmailError("**Email should have '@' and '.'");
    } else {
      document.querySelector("#numberError").style.display = "none";
      setEmail(inputEmail);
    }
  }
  function validatePhoneNumber(inputPhoneNumber) {
    const numberCheck = /^[789]\d{9}/;

    if (!numberCheck.test(inputPhoneNumber) && inputPhoneNumber !== "") {
      document.querySelector("#numberError").style.display = "block";
      setPhoneNumberError(
        "**Phone Number should start with 7/8/9 and should have 10 digits, no characters allowed"
      );
    } else {
      document.querySelector("#numberError").style.display = "none";

      setPhoneNumber(inputPhoneNumber);
    }
  }

  function handleSignUp() {
    navigate("/logIn");
  }

  async function handlePhoneSubmit(e) {
    e.preventDefault();
    const submittedData = {
      email: email,
    };
    setLoading(true);
    try {
      const response = await axios.post(emailEndpoint, submittedData);
      const authToken = response.data.token;

      console.log("Received auth token:", authToken);
      if (response.data.success) {
        console.log(email);
        navigate("/otp", { state: { email: email } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server responded with an error:", error.response.data);
        // toast.error(error.response.data.message, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        if (error.response.data.message === "No user exist with this email") {
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

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "800",
            height: "100vh",
            backgroundColor: "#011C67",
          }}
        >
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      )}
      {!loading && (
        <div className="container forContainer">
          <LeftContainer
            classDiv="loginContainer left"
            src={forgetImg}
            class="loginImage"
            // h1="Sign up for an account today"
          />
          <div className="loginContainer right">
            <div className="num">
              <ProgressBar circleCount={4} color={2} />
              <div className="space">
                <h1>
                  {loginWithPhone
                    ? "Enter Registered Number"
                    : "Enter Email Address"}
                </h1>
                <p className="light">
                  A text with a 6-digit code will be sent to your{" "}
                  {loginWithPhone ? "entered number" : "email address"}.
                </p>
              </div>
              <div className="Input">
                <div className="loginWith">
                  <label className="light">
                    {loginWithPhone ? "Phone number" : "Email address"}
                  </label>
                  {/* <a
                    className="blue loginWith"
                    onClick={() => setLoginWithPhone(!loginWithPhone)}
                  >
                    {loginWithPhone ? "Use Email" : "Use Phone number"}
                  </a> */}
                </div>
                <input
                  type="text"
                  className="input"
                  maxLength={loginWithPhone ? 10 : 50}
                  onChange={(event) => {
                    loginWithPhone
                      ? validatePhoneNumber(event.target.value)
                      : validateEmail(event.target.value);
                  }}
                  required
                />
                {/* <div>
                  <span id="numberError" className="error">
                    {loginWithPhone ? phoneNumberError : emailError}
                  </span>
                </div> */}
              </div>

              <div className="errorContainer">
                <span id="numberError">
                  {loginWithPhone ? phoneNumberError : emailError}
                </span>
              </div>
              <Button
                type="submit"
                class="submit button number"
                label="Submit"
                onClick={handlePhoneSubmit}
              />
              <div className="lowNavigate">
                <span className="blue  forLog" onClick={handleSignUp}>
                  Log In
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
