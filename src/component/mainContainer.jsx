import React, { useState } from "react";
import LoginForm from "./loginForm";
import SignUpForm from "./signUp";
import loginImage from "../assets/login.png";
import signUpImage from "../assets/sign-up.png";
import forgotPasswordImage from "../assets/verification.png";
import Forgotten from "./forgot";

const MainContainer = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  function handleToggleForm() {
    setShowSignUp(!showSignUp);
    setForgotPassword(false);
  }

  function handleForgotPassword() {
    setForgotPassword(true);
  }

  return (
    <div className="container">
      <div className="loginContainer left">
        {showSignUp ? (
          <h1 className="signUpLine">Sign up for an account today</h1>
        ) : (
          <h1 className="signUpLine">
            {forgotPassword
              ? "Forgot your password? We're here to help."
              : "Login on cloud today, tomorrow, or from any location"}
          </h1>
        )}
        <img
          src={
            forgotPassword
              ? forgotPasswordImage
              : showSignUp
              ? signUpImage
              : loginImage
          }
          className="loginImage"
          alt={
            forgotPassword
              ? "Forgot Password"
              : showSignUp
              ? "Sign Up"
              : "Login"
          }
        />
      </div>

      {forgotPassword ? (
        <Forgotten />
      ) : showSignUp ? (
        <SignUpForm />
      ) : (
        <LoginForm />
      )}

      <div className="signUp">
        {forgotPassword ? (
          <a className="blue" onClick={handleToggleForm}>
            {showSignUp ? "Log in" : "Sign up here"}
          </a>
        ) : (
          <>
            <span className="blue light" onClick={handleForgotPassword}>
              Forgot Password?
            </span>
            <a className="blue" onClick={handleToggleForm}>
              {showSignUp ? "Log in" : "Sign up here"}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
