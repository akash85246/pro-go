import logo from "../../assets/logo.svg";
import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <nav className="homeNavbar">
      <div className="homePageIcon">
        <img src={logo} alt="Logo" />
        <h1>Pro-Go</h1>
      </div>
      <div>
        <Dropdown title="Solutions">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Dropdown>

        <Dropdown title="Plans">
          <ul>
            <li>Item A</li>
            <li>Item B</li>
            <li>Item C</li>
          </ul>
        </Dropdown>
        <a> Pricing</a>
        <Dropdown title="Resources">
          <ul>
            <li>Item A</li>
            <li>Item B</li>
            <li>Item C</li>
          </ul>
        </Dropdown>
        <button className="signInButton">Sign in</button>
        <button className="signUpButton">Sign up</button>
      </div>
    </nav>
  );
}
