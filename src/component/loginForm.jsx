import React, { useState } from "react";
import ProgressBar from "./progress";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function validateEmail(email) {
    const emailCheck = /^[\w\.-]+@[\w\.-]+\.\w+/;
    return emailCheck.test(email) || email === "";
  }

  function validatePassword(password) {
    return password.length >= 5 && password.length <= 15;
  }

  function handleEmailChange(event) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    if (!validateEmail(inputEmail)) {
      document.getElementById("emailError").innerHTML =
        '**Email should have "@" and "."';
    } else {
      document.getElementById("emailError").innerHTML = "";
    }
  }

  function handlePasswordChange(event) {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevents the form from submitting in the default way
    console.log("Email:", email);
    console.log("Password:", password);
  }

  return (
    <div className="loginContainer right">
      <ProgressBar />
      <div>
        <h1>Account Login</h1>
        <p className="light">
          If you are already a member, you can log in with your email address
          and password.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="entry">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label className="light">Email address</label>
            <a className="blue">Login with Phone number?</a>
          </div>
          <input
            type="text"
            className="email input"
            value={email}
            onChange={handleEmailChange}
            maxLength={50}
            required
          />
          <span id="emailError" className="error" />
        </div>
        <div className="entry">
          <label className="light">Password</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="password input"
              value={password}
              onChange={handlePasswordChange}
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
        </div>
        <div>
          <input type="checkbox" />
          <label className="light">Remember me .</label>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="submit"
            className="button"
            value="Login with"
            disabled={!validateEmail(email) || !validatePassword(password)}
          />
        </div>
      </form>
      <div className="signUp">
        <span className="light">Don't have an account? </span>
        <a className="blue">Sign up here</a>
      </div>
    </div>
  );
}

export default LoginForm;
