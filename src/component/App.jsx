import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verification from "./verify";
import Forgotten from "./forgot";
import SignUpForm from "./signUp";
import LoginForm from "./loginForm";
import Homepage from "./homepage";
import Reset from "./resetPassword";
import Otp from "./otpVerification";
function App() {
  return (
    <>
      <Router>
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
      <ToastContainer />
    </>
  );
}

export default App;
