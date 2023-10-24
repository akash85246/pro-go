import React, { useState } from "react";
import LoginForm from "./loginForm";
import SignUpForm from "./signUp";

const MainContainer = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  function handleShowSignUp() {
    setShowSignUp(true);
  }

  return (
    <div className="container">


      <div className="loginContainer left">
        <img src="../src/assets/login.png" className="loginImage" alt="Login" />
      </div>

      {showSignUp ? <SignUpForm /> : <LoginForm />}

      <div className="signUp">
        <span className="blue light">Forgot Password ? </span>
        <a className="blue" onClick={handleShowSignUp}>
          Sign up here
        </a>
      </div>
    </div>
  );
};

export default MainContainer;
