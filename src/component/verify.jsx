import React, { useState } from "react";
import Button from "./button";
import { useLocation } from "react-router-dom";
import LeftContainer from "./leftContainer";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Verification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const verifyEndpoint =
    "https://pro-go.onrender.com/api/auth/email-verification/";

  const location = useLocation();
  const { email } = location.state;
  {
    console.log(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const submittedData = {
      email: email,
      otp: verificationCode,
    };
    console.log("Registering Account:", submittedData);
    try {
      const response = await axios.post(verifyEndpoint, submittedData);
      const authToken = response.data.token;

      console.log("Received auth token:", authToken);
      if (response.data.success) {
        console.log("verified");
        navigate("/home");
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
    <>
      <div className="container">
        <LeftContainer
          classDiv="loginContainer left"
          src="../src/assets/verification.svg"
        />

        <div className="loginContainer right verify">
          <h1>Enter verification code</h1>
          <p className="light">
            a text with 6-digit code has been sent to your email
          </p>
          <div className="Input">
            <label className="light">Enter verification code</label>
            <input
              type="text"
              className="input verifyInput"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            class="submit button"
            label="Submit"
            onClick={(e) => handleSubmit(e, "register")}
          />
          <div>Use another email</div>
        </div>
      </div>
    </>
  );
}
