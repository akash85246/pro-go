import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Verification from "./authentication/signUp/verify";
import Forgotten from "./authentication/forgot/forgot";
import SignUpForm from "./authentication/signUp/signUp";
import LoginForm from "./authentication/login/loginForm";
import Homepage from "./homepage";
import Reset from "./authentication/reset/resetPassword";
import Otp from "./authentication/forgot/otpVerification";

function App() {
  return (
    <>
      <Router basename="/pro-go/">
        <Routes>
          <Route path="/verify" element={<Verification />} />
          <Route path="/forgot" element={<Forgotten />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/logIn" element={<LoginForm />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
