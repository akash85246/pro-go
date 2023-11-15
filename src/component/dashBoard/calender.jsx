import "./calender.css";
import DashNav from "./dashNavbar";
import Sidebar2 from "./sidebar2";
import "./addMember.css";

export default function Calender() {
  return (
    <div className="workspaceContainer">
      <Sidebar2 selected="calender" />
      <div className="dashMainContainer">
        <DashNav />
      </div>
      <div className="dashMain">
        
      </div>
    </div>
  );
}
