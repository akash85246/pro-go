import React, { useEffect, useState } from "react";
import Button from "../../utils/button";
import { useLocation } from "react-router-dom";
import LeftContainer from "../../utils/leftContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import verifyImg from "../../../assets/verification.svg";
import eyeImg from "../../../assets/eye.svg";
import eyeHidImg from "../../../assets/eye-hide.svg";
import logo from "../../../assets/logo.svg";
import ham from "../../../assets/hamburger.svg";
import { toast } from "react-toastify";
// import "../../../../public/react-toastify/dist/ReactToastify.css";
  import "react-toastify/dist/ReactToastify.css";

export default function Verification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const verifyEndpoint =
    "https://pro-go.onrender.com/api/auth/email-verification/";
  const resentEndpoint = "https://pro-go.onrender.com/api/auth/resend-otp";

  const location = useLocation();
  const { email } = location.state;
  {
    console.log(email);
  }
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  async function handleSubmit(e) {
    e.preventDefault();
    const submittedData = {
      email: email,
      otp: verificationCode,
    };
    console.log("Registering Account:", submittedData);

    setLoading(true);
    {
      console.log(loading);
    }
    try {
      const response = await axios.post(verifyEndpoint, submittedData);
      const authToken = response.data.token;

      console.log("Received auth token:", authToken);
      if (response.data.success) {
        console.log("verified");
        navigate("/logIn");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server responded with an error:", error.response.data);

        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        if (error.response.data.message === "No user exist with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:");
      } else {
        console.error("Error setting up the request:");
      }
    } finally {
      console.log(loading);
      setLoading(false);
    }
  }

  async function Resent(e) {
    e.preventDefault();
    setResendTimer(60);
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
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
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
    <>
      {
        <form onSubmit={handleSubmit}>
          
          <div className="container">
            <div className="navbar">
              <img src={logo}></img>
            </div>
            <LeftContainer
              classDiv="loginContainer left"
              class="loginImage"
              src={verifyImg}
            />

            <div className="loginContainer right verify">
              <h1 style={{ width: "100%" }}>Enter verification code</h1>
              <p className="light" style={{ width: "100%" }}>
                a text with 6-digit code has been sent to your email
              </p>

              <div className="Input">
                <label className="light">Enter verification code</label>
                <input
                  type="number"
                  className="input verifyInput"
                  value={verificationCode}
                  min={100000}
                  max={999999}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>

              <div className="buttonContainer">
                <Button
                  type="submit"
                  class="submit button register"
                  label="Submit"
                  loading={loading}
                />
              </div>

              {/* <div className="resend" id="resnd" onClick={Resent}>
              Resend otp
            </div> */}

              {resendTimer > 0 ? (
                <div className="resend" id="resnd">
                  Resend OTP in {resendTimer} seconds
                </div>
              ) : (
                <div className="resend" id="resnd" onClick={Resent}>
                  Resend OTP
                </div>
              )}
            </div>
          </div>
          )
        </form>
      }
    </>
  );
}
