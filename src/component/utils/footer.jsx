import "./footer.css";
import footerlogo from "../../assets/footer_logo.svg";
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
              <img src={footerlogo}></img>
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
        </div>
        <div className="container2">
          <ul className="list1">
            <li>Product</li>
            <li>Solutions</li>

            <li>Features</li>
            <li>Tutorials</li>
            <li>Pricing</li>
          </ul>
          <ul className="list2">
            <li>Rating</li>

            <li>Tutorials</li>
          </ul>
        </div>
        <div className="container3">
          <label>Stay up to date</label>
          <div>
            <input type="text" maxLength={50}></input>
            <input type="submit" value="Subscribe"></input>
          </div>
        </div>
      </footer>
      <div className="knowing">
        <div>
          <h2>©2023 Pro-Go. All rights reserved.</h2>
        </div>
        <div>
          <div className="subscript">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </>
  );
}
