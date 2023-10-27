import React, { useState } from "react";
import ProgressBar from "./progress";
import RememberMeCheckbox from "./rememberMe";
import Button from "./button";
import LeftContainer from "./leftContainer";
import axios from "axios";
import { Vortex } from "react-loader-spinner";

import { useNavigate } from "react-router-dom";

const loginEndpoint = "https://pro-go.onrender.com/api/auth/sign-in";

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

  const navigate = useNavigate();

  function validateEmail(inputEmail) {
    const emailCheck = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailCheck.test(inputEmail) && inputEmail !== "") {
      setEmailError("**Email should have '@' and '.'");
    } else {
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
      setPhoneError(
        "**Phone Number should start with 7/8/9 and should have 10 digits, no characters allowed"
      );
    } else {
      setPhoneError("");
      setPhoneNumber(inputPhoneNumber);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      (loginWithPhone && phoneError) ||
      (!loginWithPhone && emailError) ||
      !validatePassword(password)
    ) {
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
      const authToken = response.data.token;
      console.log("Received auth token:", authToken);
      setAuthToken(authToken);
      if (response.data.success) {
        console.log("verified");
        navigate("/home");
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
          loading
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
            src="../src/assets/logIn.svg"
            h1="Login on cloud today, tomorrow, or from any location"
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
            <form onSubmit={handleSubmit}>
              <div className="entry">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space between",
                    alignItems: "center",
                  }}
                >
                  <div className="Input">
                    <div className="loginWith">
                      <label className="light">
                        {loginWithPhone ? "Phone number" : "Email address"}
                      </label>
                      <a
                        className="blue loginWith"
                        onClick={() => setLoginWithPhone(!loginWithPhone)}
                      >
                        {loginWithPhone
                          ? "Login with Email"
                          : "Login with Phone number"}
                      </a>
                    </div>
                    <input
                      type="text"
                      className={loginWithPhone ? "phone input" : "email input"}
                      onChange={(event) => {
                        loginWithPhone
                          ? validatePhoneNumber(event.target.value)
                          : validateEmail(event.target.value);
                      }}
                      maxLength={loginWithPhone ? 10 : 50}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="entry Input">
                <label className="light">Password</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="password input"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    maxLength={15}
                    minLength={5}
                    required
                  />
                  <button
                    value="i"
                    className="show"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src="../src/assets/eye.svg"
                      height={"25px"}
                      alt="show password"
                    />
                  </button>
                </div>
                <span className="error">
                  {loginWithPhone ? phoneError : emailError}
                </span>
              </div>
              <RememberMeCheckbox class="signInCheckbox" divClass="remember" />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  class="submit button"
                  label="LOG IN"
                  disabled={
                    (!loginWithPhone && emailError) ||
                    (loginWithPhone && phoneError) ||
                    !validatePassword(password)
                  }
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
