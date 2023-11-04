import "./footer.css";
import logo from "../../assets/logo.svg";
import img1 from "../../assets/xicon.svg";
import img2 from "../../assets/linkedInIcon.svg";
import img3 from "../../assets/facebookIcon.svg";
import img4 from "../../assets/githubIcon.svg";
import img5 from "../../assets/socialIcon.svg";
export default function Footer() {
  return (
    <>
      <footer>
        <div className="container1">
          <div className="logoContainer">
            <div className="logo">
              <img src={logo}></img>
              <h1>Pro-Go</h1>
            </div>
          </div>

          <div className="social">
            <img src={img1}></img>
            <img src={img2}></img>
            <img src={img3}></img>
            <img src={img4}></img>
            <img src={img5}></img>
          </div>
          <h2>
            Design amazing digital experiences that create more happy in the
            world.
          </h2>
          <h2>©2023 Pro-Go. All rights reserved.</h2>
        </div>
        <div className="container2">
          <ul className="list1">
            <li>Product</li>
            <li>Solutions</li>
            <li>Overview</li>
            <li>Faetures</li>
            <li>Tutorials</li>
            <li>Pricing</li>
            <li>Releases</li>
          </ul>
          <ul className="list2">
            <li>Resources</li>
            <li>Blog</li>
            <li>Newsletter</li>
            <li>Events</li>
            <li>Help centre</li>
            <li>Tutorials</li>
            <li>Support</li>
          </ul>
        </div>
        <div className="container3">
          <label>Stay up to date</label>
          <div>
            <input type="text"></input>
            <input type="submit" value="Subscribe"></input>
          </div>
          <div className="subscript">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </>
  );
}
