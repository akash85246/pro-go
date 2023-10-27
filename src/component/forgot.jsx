import React, { useState } from "react";
import Button from "./button";
import ProgressBar from "./progress";
import Reset from "./resetPassword";
import LeftContainer from "./leftContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const emailEndpoint = "https://pro-go.onrender.com/api/auth/forget-password";

  function validateEmail(inputEmail) {
    const emailCheck = /^[\w\.-]+@[\w\.-]+\.\w+/;

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
  async function handlePhoneSubmit(e) {
    e.preventDefault();
    const submittedData = {
      email: email,
    };
    // console.log("Registering Account:", submittedData);
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
        if (error.response.data.message === "No user exist with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:");
      } else {
        console.error("Error setting up the request:");
      }
    }
  }

  return (
    <div className="container">
      <LeftContainer
        classDiv="loginContainer left"
        src="./src/assets/verification.svg"
        h1="Sign up for an account today"
      />
      <div className="loginContainer right">
        <ProgressBar circleCount={4} color={2} />
        <div className="num">
          <h1>
            {loginWithPhone ? "Enter Registered Number" : "Enter Email Address"}
          </h1>
          <p className="light">
            A text with a 6-digit code will be sent to your{" "}
            {loginWithPhone ? "entered number" : "email address"}.
          </p>
          <div className="Input">
            <div className="loginWith">
              <label className="light">
                {loginWithPhone ? "Phone number" : "Email address"}
              </label>
              <a
                className="blue loginWith"
                onClick={() => setLoginWithPhone(!loginWithPhone)}
              >
                {loginWithPhone ? "Use Email" : "Use Phone number"}
              </a>
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
            <div>
              <span id="numberError">
                {loginWithPhone ? phoneNumberError : emailError}
              </span>
            </div>
          </div>

          <div>
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
        </div>
      </div>
    </div>
  );
}
