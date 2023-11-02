import Navbar from "./navbar";
import Features from "./specification";
import heartImg from "../../assets/heart.svg";
import folderImg from "../../assets/Folder.svg";
import plantImg from "../../assets/plant.svg";
import team from "../../assets/team.svg";
import { useAuth } from "../authContext";
import image1 from "../../assets/landing1.svg";
import image2 from "../../assets/landing2.svg";
import image3 from "../../assets/landing3.svg";
export default function Homepage() {
  const { authToken, setAuthToken } = useAuth();
  return (
    <div className="containerHome">
      <div className="centeredContent">
        <Navbar />
        <div className="part part1">
          <div>
            <h1>Trello brings all your </h1>
            <h1>tasks,teamates,and tools together</h1>
            <p>"Keep everything in the same place -even if your team isn't."</p>
            <button>Start your 14 Day's Trails</button>
            <img src={image1}></img>
          </div>
          <div>
            <div>
              <h1>One less thing to worry about</h1>
              <p>
                Your free Pro-Go account gets you acess to all this and more
              </p>
            </div>
            <div className="featureMainContainer">
              <Features
                image={heartImg}
                text="A user-friendly dashboard built for you not ,not your accountant."
              />
              <Features
                image={folderImg}
                text="Peace of mind that you're organized ahead of tax season."
              />
              <Features
                image={plantImg}
                text="A complete picture of your business health,wherever you are."
              />
              <Features
                image={team}
                text="our in house team of bookkeeping ,managing and payroll coaches."
              />
            </div>
          </div>
        </div>
        <h1>What will you get in Free trails?</h1>
        <div className="part part2">
          <div>
            <h1>A productivity powerhouse</h1>
            <h2>
              Simple,flexible and powerful.All it takes are boards,lists and
              cards to get a clear view of who's doing what and what needs to
              get done.Learn more in our <span>guide for getting started.</span>
            </h2>
          </div>
          <img src={image2}></img>
        </div>
        <div className="part part3">
          <img src={image3}></img>
          <div>
            <div>
              <h1>How to use it and add members?</h1>
              <button>Tell me more</button>
            </div>
            <div>
              <ul>
                <li>
                  <span>Onboarding</span>
                  <span>FREE</span>
                </li>

                <li>
                  <span>Assign task</span>
                  <span>FREE</span>
                </li>
                <li>
                  <span>Payments</span>
                  <span>PAY-PER-USE</span>
                </li>
                <li>
                  <span>Receipts</span>
                  <span>MONTHLY OR EARLY</span>
                </li>
                <li>
                  <span>Re-payment</span>
                  <span>MONTHLY</span>
                </li>
                <li>
                  <span>Advisor</span>
                  <span>PICK A PLAN</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
