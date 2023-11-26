import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./utils/authContext";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./utils/redirect";

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
import YourTeam from "./dashBoard/yourTeam";
import Recent from "./dashBoard/recent";
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

function PrivateRoute({ element, path }) {
  const { authToken } = useAuth();
  console.log(authToken);

  return authToken ? element : <Navigate to="/login" replace={true} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <React.Fragment>
          <ChakraProvider>
            <ReloadPrevention />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/forgot" element={<Forgotten />} />
              <Route path="/signUp" element={<SignUpForm />} />
              <Route path="/logIn" element={<LoginForm />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/price" element={<Pricing />} />
              <Route path="/error" element={<Error />} />
              <Route
                path="/profile/*"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route
                path="/dashboard/*"
                element={<PrivateRoute element={<DashBoard />} />}
              />
              <Route
                path="/board/*"
                element={<PrivateRoute element={<Board />} />}
              />
              <Route
                path="/recent/*"
                element={<PrivateRoute element={<Recent />} />}
              />
              <Route
                path="/workspace/*"
                element={<PrivateRoute element={<WorkSpace />} />}
              />
              <Route
                path="/yourteam/*"
                element={<PrivateRoute element={<YourTeam />} />}
              />
              <Route
                path="/member/*"
                element={<PrivateRoute element={<Member />} />}
              />
              <Route
                path="/calender/*"
                element={<PrivateRoute element={<Calender />} />}
              />
              <Route
                path="/setting/*"
                element={<PrivateRoute element={<Setting />} />}
              />
              <Route
                path="/listandcards/*"
                element={<PrivateRoute element={<ListAndCard />} />}
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </ChakraProvider>
        </React.Fragment>
      </Router>
    </AuthProvider>
  );
}

export default App;
