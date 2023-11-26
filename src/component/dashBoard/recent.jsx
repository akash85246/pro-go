import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import DashNav from "./dashNavbar";
import { useAuth } from "../utils/authContext";
export default function Recent() {
  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain"></div>
      </div>
    </div>
  );
}
