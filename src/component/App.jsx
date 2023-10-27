// App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainContainer from "./mainContainer";
import Verification from "./verify";
import Forgotten from "./forgot";
import SignUpForm from "./signUp";
import LoginForm from "./loginForm";
import Homepage from "./homepage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify" element={<Verification />} />
        <Route path="/forgot" element={<Forgotten />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/logIn" element={<LoginForm />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<MainContainer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
