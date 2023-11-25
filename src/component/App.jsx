import React, { useEffect } from "react";
import { AuthProvider } from "./utils/authContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Remove Navigate from here
import { useDispatch, useSelector } from "react-redux";
import store from "./utils/redirect.jsx";

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
import ListAndCard from "./dashBoard/displayBoard";
import Setting from "./dashBoard/setting";
import Member from "./dashBoard/addMembers";
import Calender from "./dashBoard/calender";
import { ChakraProvider } from "@chakra-ui/react";

// Additional imports for redirecting
// import { Redirect } from "react-router-dom"; // Remove this line

function ReloadPrevention() {
  const dispatch = useDispatch();
  const isReloading = useSelector((state) => state.isReloading);

  useEffect(() => {
    window.onbeforeunload = () => {
      dispatch({ type: "SET_RELOADING", payload: true });
    };

    return () => {
      dispatch({ type: "SET_RELOADING", payload: false });
    };
  }, [dispatch]);

  return isReloading ? <Navigate to="/" /> : null;
}

function App() {
  return (
    <>
      <AuthProvider>
        <ChakraProvider>
          <Router>
            <Routes>
              {/* Include the ReloadPrevention component at the top of your Routes */}
              <Route path="/" element={<ReloadPrevention />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/forgot" element={<Forgotten />} />
              <Route path="/signUp" element={<SignUpForm />} />
              <Route path="/logIn" element={<LoginForm />} />
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
              <Route path="/listandcards" element={<ListAndCard />} />
              <Route path="/*" element={<Homepage />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default App;
