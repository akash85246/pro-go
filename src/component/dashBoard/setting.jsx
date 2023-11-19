import Sidebar2 from "./sidebar2";
import "./setting.css";
import DashNav from "./dashNavbar";
export default function Setting() {
  return (
    <div className="workspaceContainer">
      <Sidebar2 selected="setting" />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain"></div>
      </div>
    </div>
  );
}
