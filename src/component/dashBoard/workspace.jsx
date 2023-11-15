import Sidebar2 from "./sidebar2";
import "./workSpace.css"
export default function workSpace() {
  return (
    <div className="workspaceContainer">
      <Sidebar2 />
      <div className="dashMainContainer">
        <div className="navbarDash"></div>
        <div className="dashMain"></div>
      </div>
    </div>
  );
}
