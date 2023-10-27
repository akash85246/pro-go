import React, { useState } from "react";
import Button from "./button";
import ProgressBar from "./progress";
import Reset from "./resetPassword";
import LeftContainer from "./leftContainer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();
  const emailEndpoint = "https://pro-go.onrender.com/api/auth/verify-otp";
  const resentEndpoint = "https://pro-go.onrender.com/api/auth/resend-otp";

  async function handleSubmit(e) {
    e.preventDefault();
    const submittedData = {
      email: email,
      otp: otp,
    };
    console.log(submittedData);
    try {
      const response = await axios.post(emailEndpoint, submittedData);
      const authToken = response.data.token;
      console.log("Received auth token:", authToken);
      if (response.data.success) {
        navigate("/reset", { state: { email } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server responded with an error:", error.response.data);
        if (error.response.data.message === "No user exists with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  }
  async function Resent(e) {
    e.preventDefault();
    const submittedData = {
      email: email,
    };
    console.log(submittedData);
    try {
      const response = await axios.post(resentEndpoint, submittedData);
      const authToken = response.data.token;
      console.log("Received auth token:", authToken);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server responded with an error:", error.response.data);
        if (error.response.data.message === "No user exists with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:");
      } else {
        console.error("Error setting up the request:", error.message);
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
        <h1>Enter verification code</h1>
        <p className="light">
          A text with a digit code has been sent to your email address.
        </p>
        <div className="Input">
          <label className="light">Enter OTP</label>
          <input
            type="text"
            className="input"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button
            type="submit"
            class="submit button otp"
            label="Submit OTP"
            onClick={handleSubmit}
          />
          <div className="resend" id="resnd" onClick={Resent}>
            Resend otp
          </div>
        </div>
      </div>
    </div>
  );
}
