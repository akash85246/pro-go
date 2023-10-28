import React, { useState } from "react";
import ProgressBar from "./progress";
import Button from "./button";
import LeftContainer from "./leftContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const resetEndpoint = "https://pro-go.onrender.com/api/auth/change-password/";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [authToken, setAuthToken] = useState("");
  const { email, tokenValue } = location.state;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({
      ...formData,
      password: newPassword,
    });

    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (newPassword.length >= 8 && hasLetter && hasNumber) {
      setPasswordStrength("Strong");
    } else if (newPassword.length >= 6 && (hasLetter || hasNumber)) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Weak");
    }

    if (newPassword !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setFormData({
      ...formData,
      confirmPassword: newConfirmPassword,
    });

    if (formData.password !== newConfirmPassword) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(tokenValue);
      const headers = {
        "verify-token": `${tokenValue}`,
      };

      const response = await axios.post(
        resetEndpoint,
        {
          email: email,
          newPassword: formData.password,
        },
        {
          withCredentials: false,
          headers: headers,
        }
      );
      const authToken = response.data.token;
      console.log("Received auth token:", authToken);
      setAuthToken(authToken);
      if (response.data.success) {
        console.log("verified");
        navigate("/login");
      }
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
        console.error("No response received. Network error:", error);
      } else {
        console.error("Error setting up the request:", error);
      }
    } finally {
      // Set loading to false to hide the loader
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
        <div className="container">
          <LeftContainer
            classDiv="loginContainer left"
            src="./src/assets/reset.svg"
          />

          <div className="loginContainer right log">
            <ProgressBar circleCount={4} color={3} />
            <h1>Reset password</h1>
            <form onSubmit={handleSubmit}>
              <div className="Input">
                <label className="light">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  required
                  maxLength={15}
                  minLength={5}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                {formData.password && (
                  <div id="passwordStrength">
                    Password Strength: {passwordStrength}
                  </div>
                )}
              </div>
              <div className="Input">
                <label className="light">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="input"
                  required
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  maxLength={15}
                  minLength={5}
                />
              </div>
              {passwordMatchError && <div id="pass">{passwordMatchError}</div>}
              <Button
                type="submit"
                class="submit button register" // Use className instead of class
                label="Reset Password"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
