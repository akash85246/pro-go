import React from "react";
import { AuthProvider } from "./utils/authContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "../../public/react-toastify/dist/ReactToastify.css";
import Verification from "./authentication/signUp/verify";
import Forgotten from "./authentication/forgot/forgot";
import SignUpForm from "./authentication/signUp/signUp";
import LoginForm from "./authentication/login/loginForm";
import Homepage from "./LandingPage/homepage";
import Reset from "./authentication/reset/resetPassword";
import Otp from "./authentication/forgot/otpVerification";
import Error from "./utils/error";
import Pricing from "./pricingPlan/price";
import Profile from "./profile/profile";
import DashBoard from "./dashBoard/workspace";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/verify" element={<Verification />} />
            <Route path="/forgot" element={<Forgotten />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/logIn" element={<LoginForm />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/price" element={<Pricing />} />
            <Route path="/error" element={<Error />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<DashBoard />} />

            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
        {/* <ToastContainer
         /> */}
      </AuthProvider>
    </>
  );
}

export default App;
