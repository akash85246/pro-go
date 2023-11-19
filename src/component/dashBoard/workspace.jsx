import Sidebar2 from "./sidebar2";
import "./workSpace.css";
import DashNav from "./dashNavbar";
export default function workSpace() {
  return (
    <div className="workspaceContainer">
      <Sidebar2 selected="home" />
      <div className="dashMainContainer">
        <DashNav />
        <div className="dashMain"></div>
      </div>
    </div>
  );
}
