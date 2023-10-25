import React, { useState } from "react";
import ProgressBar from "./progress";
import RememberMeCheckbox from "./rememberMe";
import Button from "./button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function validateEmail(inputEmail) {
    const emailCheck = /^[\w\.-]+@[\w\.-]+\.\w+/;

    if (!emailCheck.test(inputEmail) && inputEmail !== "") {
      document.querySelector(".error").style.display = "block";
      setEmailError("**Email should have '@' and '.'");
    } else {
      document.querySelector(".error").style.display = "none";
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
      document.querySelector(".error").style.display = "block";
      setPhoneError(
        "**Phone Number should start with 7/8/9 and should have 10 digits, no characters allowed"
      );
    } else {
      document.querySelector(".error").style.display = "none";
      setPhoneError("");
      setPhoneNumber(inputPhoneNumber);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
  }

  return (
    <div className="loginContainer right">
      <ProgressBar circleCount={4} color={1} />
      <div>
        <h1>Account Login</h1>
        <p className="light">
          If you are already a member, you can log in with your{" "}
          {loginWithPhone ? "phone number" : "email address"} and password.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="entry">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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
            <input
              type="button"
              value="i"
              className="show"
              onClick={() => setShowPassword(!showPassword)}
            />
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
  );
}

export default LoginForm;
