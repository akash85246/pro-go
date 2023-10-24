import React, { useState } from "react";
import LoginForm from "./loginForm";
import SignUpForm from "./signUp";
import loginImage from "../assets/login.png";
import signUpImage from "../assets/sign-up.png";

const MainContainer = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  function handleToggleForm() {
    setShowSignUp(!showSignUp);
  }

  return (
    <div className="container">
      <div className="loginContainer left">
        <img
          src={showSignUp ? signUpImage : loginImage}
          className="loginImage"
          alt={showSignUp ? "Sign Up" : "Login"}
        />
      </div>

      {showSignUp ? <SignUpForm /> : <LoginForm />}

      <div className="signUp">
        <span className="blue light">Forgot Password ?</span>
        <a className="blue" onClick={handleToggleForm}>
          {showSignUp ? "Log in" : "Sign up here"}
        </a>
      </div>
    </div>
  );
};

export default MainContainer;