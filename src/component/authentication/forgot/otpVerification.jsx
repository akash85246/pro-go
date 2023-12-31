import React, { useEffect, useState } from "react";
import Button from "../../utils/button";
import ProgressBar from "../../utils/progress";
import Reset from "../reset/resetPassword";
import LeftContainer from "../../utils/leftContainer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import otpImg from "../../../assets/verification.svg";
import logo from "../../../assets/logo.svg";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function Otp() {
   const toast = useToast();
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();
  const emailEndpoint = "https://pro-go.onrender.com/api/auth/verify-otp";
  const resentEndpoint = "https://pro-go.onrender.com/api/auth/resend-otp";
  const [authToken, setAuthToken] = useState("");
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
      otp: otp,
    };
    console.log(submittedData);
    setLoading(true);
    try {
      const response = await axios.post(emailEndpoint, submittedData);
      setAuthToken(response.data.token);

      console.log("Received auth token:", authToken);
      if (response.data.success) {
        const responseData = response.data;
        const tokenValue = responseData.data.token;
        setToken(tokenValue);
        console.log(responseData.data.token);
        navigate("/reset", { state: { email, tokenValue } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast({
          title: "Error Notification!",
          description: error.response?.data?.message || "An error occurred",
          status: "error",
          position: "top-centre",
          duration: 3000,
          isClosable: true,
          render: () => (
            <Box p={3} color="white" bg="red.500" borderRadius="md">
              <WarningIcon mr={3} />
              {error.response?.data?.message || "An error occurred"}
            </Box>
          ),
        });
        alert(error.response.data.message);
        console.error("Server responded with an error:", error.response.data);
        if (error.response.data.message === "No user exists with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {
        <form onSubmit={handleSubmit}>
          <div className="container forContainer">
            <div className="navbar">
              <img src={logo}></img>
              <h3>Pro-Go</h3>
            </div>
            <LeftContainer
              classDiv="loginContainer left"
              src={otpImg}
              class="loginImage"
              // h1="Sign up for an account today"
            />
            <div className="loginContainer right">
              <ProgressBar circleCount={4} color={2} />
              <div>
                <div className="space">
                  <h1>Enter verification code</h1>
                  <p className="light">
                    A text with a digit code has been sent to your email
                    address.
                  </p>
                </div>
                <div className="Input">
                  <label className="light">Enter verification code</label>
                  <input
                    type="number"
                    className="input"
                    value={otp}
                    minLength={6}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    required
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
                {resendTimer > 0 ? (
                  <div className="resend forLog disabled">
                    Resend OTP in {resendTimer} seconds
                  </div>
                ) : (
                  <div className="resend forLog" id="resnd" onClick={Resent}>
                    Resend OTP
                  </div>
                )}
              </div>
            </div>
          </div>
          )
        </form>
      }
    </>
  );
}
