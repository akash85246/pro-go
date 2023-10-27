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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify" element={<Verification />} />
        <Route path="/" element={<MainContainer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
