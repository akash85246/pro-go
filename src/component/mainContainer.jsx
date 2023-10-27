import React, { useState } from "react";
import LoginForm from "./loginForm";
import SignUpForm from "./signUp";


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
    <div>

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
