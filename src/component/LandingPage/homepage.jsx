import Navbar from "../utils/navbar";
import Features from "./specification";
import heartImg from "../../assets/heart.svg";
import folderImg from "../../assets/Folder.svg";
import plantImg from "../../assets/plant.svg";
import team from "../../assets/team.svg";
// import { useAuth } from "../authContext";
import "./homepage.css";
import image1 from "../../assets/landing1.svg";
import image2 from "../../assets/landing2.svg";
import image3 from "../../assets/landing3.svg";
import Footer from "../utils/footer";
import Cards from "./card";
import box1Img from "../../assets/box1.svg";
import box2Img from "../../assets/box2.svg";
import box3Img from "../../assets/box3.svg";
import box4Img from "../../assets/box4.svg";
import box5Img from "../../assets/box5.svg";
import box6Img from "../../assets/box6.svg";
export default function Homepage() {
  // const { authToken, setAuthToken } = useAuth();
  return (
    <>
      <Navbar />
      <div className="containerHome">
        <div className="centeredContent">
          <div className="part part1">
            <div
              style={{
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>
                Pro-Go brings all your tasks , teamates , and tools together
              </h1>
              <p>
                &quot;Keep everything in the same place -even if your team
                isn&apos;t.&quot;
              </p>
              <button>Start your 14 Day's Trails</button>
              <img src={image1} className="img1"></img>
            </div>
            <div>
              <div className="get">
                <h2>One less thing to worry about</h2>
                <p className="light">
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

          <div className="part part2">
            <div className="img2Text">
              <h1>A productivity powerhouse</h1>
              <h2>
                Simple,flexible and powerful.All it takes are boards,lists and
                cards to get a clear view of who's doing what and what needs to
                get done.Learn more in our{" "}
                <span>guide for getting started.</span>
              </h2>
            </div>
            <div>
              <img src={image2} className="img2"></img>
            </div>
          </div>
          <h1>What will you get in Free trails?</h1>
          <div className="part part3">
            <div className="member1">
              <img src={image3} className="img3"></img>
            </div>
            <div className="member2">
              <h1>How to use it and add members?</h1>
              <button>Tell me more</button>
            </div>
            <div className="member3">
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
          <h1 className="get">WORKFLOWS FOR ANY PROJECT BIG OR SMALL</h1>
          <div className="part part4">
            <Cards
              title="WORKSPACE"
              img={box1Img}
              text="Create and send professional
invoices in minutes."
            />
            <Cards
              title="SELF-EMPLOYED"
              img={box2Img}
              text="Pay your staff (and yourself!)
with confidence."
            />
            <Cards
              title="MEET FEATURE"
              img={box3Img}
              text="Set up recurring portable and
easy meetings with clients."
            />
            <Cards
              title="TASK MANAGEMENT"
              img={box4Img}
              text="Track your team’s assign task
with our easy tracking tools."
            />
            <Cards
              title="CONSULTANTS"
              img={box5Img}
              text="Set up recurring invoices and
payments for retainer clients."
            />
            <Cards
              title="STAY ON TOP OF TASKS"
              img={box6Img}
              text="Create and send task to other team
members in minutes."
            />
          </div>
          <div className="part part5">
            <div className="workContainer">
              <div>
                No need to start from scratch. Jump-start your workflow with a
                proven playbook designed for different teams. Customize it to
                make it yours.
              </div>
              <div>
                <button className="LetDoThis">Let’s do this</button>
              </div>
            </div>
          </div>
          <div className="part part6">
            <div className="seeWork">
              <h1>See work in a whole new way</h1>
              <p>
                View your team’s projects from every angle and bring a fresh
                perspective to the task at hand.
              </p>
              <button>Discover all views</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
