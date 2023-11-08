import React, { useEffect, useState } from "react";
import RememberMeCheckbox from "../../utils/rememberMe";
import Terms from "../../utils/terms";
import Button from "../../utils/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftContainer from "../../utils/leftContainer";
// import { toast } from "../../../../node_modules/react-toastify";

// import "../../../../public/react-toastify/dist/ReactToastify.css";
import eyeImg from "../../../assets/eye.svg";
import eyeHidImg from "../../../assets/eye-hide.svg";
import signUpImg from "../../../assets/sign-up.png";
import logo from "../../../assets/logo.svg";
  // import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../../utils/authContext";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const signEndpoint = "https://pro-go.onrender.com/api/auth/sign-up/";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  function validateEmail(inputEmail) {
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailCheck.test(inputEmail) && inputEmail !== "") {
      document.querySelector(".errorEmail").style.display = "block";

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
      document.querySelector(".errorEmail").style.display = "none";
      setEmailError("");
      setEmail(inputEmail);
    }
  }

  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  function validateUsername(inputName) {
    const trimmedName = inputName.trim();

    if (trimmedName.length === 0) {
      showError("Username should not be empty");
    } else if (trimmedName.length < 3) {
      showError("Username is too small");
    } else if (!/^[a-zA-Z0-9@!#$%^&*_-]+$/.test(trimmedName)) {
      showError("Invalid Username");
    } else {
      hideError();
      setName(trimmedName);
    }
  }

  function showError(errorMessage) {
    document.getElementById("nameError").style.display = "block";
    document.getElementById("nameError").textContent = errorMessage;
  }

  function hideError() {
    document.getElementById("nameError").style.display = "none";
  }

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

    // Check for password mismatch
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

    if (formData.password !== newConfirmPassword) {
      document.getElementById("confPass").style.display = "block";
      setPasswordMatchError("Passwords do not match");
    } else {
      document.getElementById("confPass").style.display = "none";
      setPasswordMatchError("");
    }
  };
  const eye = () => {
    setShowPassword(!showPassword);
  };
  const eyeConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  function handleSignUp() {
    navigate("/logIn");
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !name ||
      !email ||
      emailError ||
      !(passwordStrength === "Strong") ||
      passwordMatchError
    ) {
      return;
    }

    const submittedData = {
      username: name,
      email: email,
      password: formData.password,
    };
    console.log("Registering Account:", submittedData);

    setLoading(true);
    try {
      const response = await axios.post(signEndpoint, submittedData);
      const authToken = response.data.token;

      console.log("Received auth token:", authToken);
      if (response.data.success) {
        navigate("/verify", { state: { email: email } });
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
      {
        <form onSubmit={handleSubmit}>
          <div className="navbar">
            <img src={logo}></img>
          </div>
          <div className="container">
            <LeftContainer
              classDiv="loginContainer left signUpLeft"
              src={signUpImg}
              class="loginImage signUpImage"
              h1="Login on cloud today ,tomorrow or by any location"
            />
            <div className="loginContainer right signUpRight">
              <div style={{ textAlign: "left", width: "100%" }}>
                <h1 className="signUpH1">Create account</h1>
              </div>
              <div className="Input signUpInput">
                <div className="signIC">
                  <label className="light">Username</label>
                  <input
                    type="text"
                    name="name"
                    className="input signCp"
                    id="name"
                    maxLength={60}
                    minLength={3}
                    onChange={(event) => {
                      validateUsername(event.target.value);
                    }}
                    required
                  />
                  <div className="errorContainer1 signUpErrorContainer">
                    <span id="nameError" className="error">
                      Invalid name
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className="emailNumber"> */}
              <div className="Input signUpInput">
                <div className="signIC">
                  <label className="light">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    maxLength={50}
                    className="input signCp"
                    required
                    onChange={(event) => {
                      validateEmail(event.target.value);
                    }}
                  />
                  <div className="errorContainer1 signUpErrorContainer">
                    <span id="emailError" className="errorEmail error">
                      Invalid email
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="Input">
              <label className="light">Phone Number</label>
                <input
                  type="text"
                  name="number"
                  maxLength={10}
                  id="phoneNumber"
                  className="input sui"
                  required
                  onChange={validateForm}
                />
              <span id="numberError">
                  **Phone Number should start with 7/8/9 and should have 10
                  digits, no characters allowed
                </span>
            </div> */}
              {/* </div> */}

              <div className="createPassword">
                <div className="Input signUpInput">
                  <div className="signIC">
                    <label className="light">Password</label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="input signCp"
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
                  <div className="errorContainer1 signUpErrorContainer">
                    {
                      <div
                        id="passwordStrength"
                        className={`${passwordStrength.toLowerCase()} error`}
                      >
                        Password Strength: {passwordStrength}
                      </div>
                    }
                  </div>
                </div>
                <div className="Input signUpInput">
                  <div className="signIC">
                    <label className="light">Confirm password</label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="input signCp"
                        required
                        value={formData.confirmPassword}
                        maxLength={30}
                        minLength={6}
                        onChange={handleConfirmPasswordChange}
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
                  <div className="errorContainer1 signUpErrorContainer">
                    <span id="confPass" className="error">
                      Passwords do not match
                    </span>
                  </div>
                </div>
              </div>
              <div className="checkbox">
                <RememberMeCheckbox class="signUpCheckbox" divClass="sic" />
                <Terms />
              </div>
              <div className="buttonContainer">
                <Button
                  type="submit"
                  class="submit button register"
                  label="Register account"
                  loading={loading}
                />
              </div>
              {/* <Button
              type="submit"
              class="submit button google"
              label="Sign-in with Google"
              onClick={handleSubmit}
            /> */}
              <div className="lowNavigate forLog">
                <span className=" light">Already have an account?</span>
                <span className="blue " onClick={handleSignUp}>
                  &nbsp;Log In
                </span>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
}

export default SignUpForm;
