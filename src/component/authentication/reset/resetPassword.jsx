import React, { useState } from "react";
import ProgressBar from "../../utils/progress";
import Button from "../../utils/button";
import LeftContainer from "../../utils/leftContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import resetImg from "../../../assets/reset.svg";
import logo from "../../../assets/logo.svg";
import ham from "../../../assets/hamburger.svg";
// import { toast } from "../../../../node_modules/react-toastify";

// import "../../../../public/react-toastify/dist/ReactToastify.css";
import eyeImg from "../../../assets/eye.svg";
import eyeHidImg from "../../../assets/eye-hide.svg";
  // import "react-toastify/dist/ReactToastify.css";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const eye = () => {
    setShowPassword(!showPassword);
  };
  const eyeConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({
      ...formData,
      password: newPassword,
    });

    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (newPassword.length >= 8 && hasLetter && hasNumber) {
      document.getElementById("passwordStrength").style.display = "block";
      setPasswordStrength("Strong");
    } else if (newPassword.length >= 6 && (hasLetter || hasNumber)) {
      document.getElementById("passwordStrength").style.display = "block";
      setPasswordStrength("Moderate");
    } else if (newPassword.length !== 0) {
      document.getElementById("passwordStrength").style.display = "block";
      setPasswordStrength("Weak");
    } else {
      document.getElementById("passwordStrength").style.display = "none";
    }

    if (newPassword !== formData.confirmPassword) {
      document.getElementById("resetPass").style.display = "block";
      setPasswordMatchError("Passwords do not match");
    } else {
      document.getElementById("resetPass").style.display = "none";

      setPasswordMatchError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setFormData({
      ...formData,
      confirmPassword: newConfirmPassword,
    });

    // Check for password mismatch
    if (formData.password !== newConfirmPassword) {
      document.getElementById("resetPass").style.display = "block";
      setPasswordMatchError("Passwords do not match");
    } else {
      document.getElementById("resetPass").style.display = "none";
      setPasswordMatchError("");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!(passwordStrength === "Strong") || passwordMatchError) {
      return;
    }
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
        // toast.error(error.response.data.message, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        if (error.response.data.message === "No user exists with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:", error);
      } else {
        console.error("Error setting up the request:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {
        <form onSubmit={handleSubmit}>
          <div className="navbar">
            <img src={logo}></img>
          </div>
          <div className="container">
            <LeftContainer
              classDiv="loginContainer left"
              class="loginImage"
              src={resetImg}
            />

            <div className="loginContainer right log resetRight">
              <ProgressBar circleCount={4} color={3} />
              <h1>Reset password</h1>

              <div className="Input resetInput">
                <label className="light">Password</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input resetP"
                    required
                    maxLength={30}
                    minLength={6}
                    onChange={handlePasswordChange}
                  />
                  <div className="show" onClick={eye}>
                    <img
                      src={showPassword ? eyeHidImg : eyeImg}
                      height={"25px"}
                      onClick={eye}
                      alt="show password"
                    />
                  </div>
                </div>
              </div>
              <div className="errorContainer1">
                <div className="password-strength-container resetPSC">
                  <div
                    id="passwordStrength"
                    className={passwordStrength.toLowerCase()}
                    style={{ width: "32.5vw", marginTop: "-2vh" }}
                  >
                    Password Strength: {passwordStrength}
                  </div>
                </div>
              </div>
              <div className="Input resetInput">
                <label className="light">Confirm password</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="input resetCP"
                    required
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    maxLength={30}
                    minLength={6}
                  />

                  <div className="show" onClick={eyeConfirm}>
                    <img
                      src={showConfirmPassword ? eyeHidImg : eyeImg}
                      height={"25px"}
                      onClick={eyeConfirm}
                      alt="show password"
                    />
                  </div>
                </div>
              </div>
              <div className="errorContainer1">
                <div
                  id="resetPass"
                  className="error"
                  style={{ width: "100%", marginTop: "0vh" }}
                >
                  password do not match
                </div>
              </div>
              <div className="buttonContainer">
                <Button
                  type="submit"
                  class="submit button register"
                  label="Submit"
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
}
