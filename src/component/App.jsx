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
import DashBoard from "./dashBoard/dash";
import Board from "./dashBoard/board";
import WorkSpace from "./dashBoard/workspace";
import MyBoard from "./dashBoard/displayBoard";
import Setting from "./dashBoard/setting";
import Member from "./dashBoard/addMembers";
import Calender from "./dashBoard/calender";
// import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <>
      <AuthProvider>
        <ChakraProvider>
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
              <Route path="/board" element={<Board />} />
              <Route path="/workspace" element={<WorkSpace />} />
              <Route path="/member" element={<Member />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/myboard" element={<MyBoard />} />

              <Route path="/" element={<Homepage />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
          {/* <ToastContainer
         /> */}
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default App;
