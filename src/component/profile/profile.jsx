import Navbar from "../utils/navbar";
import "./profile.css";
import Footer from "../utils/footer";
import Input from "./input";
import profilephoto from "../../assets/profilePhoto.jpg";
import ProfileImg from "../utils/profileImg";
export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="mainContainerProfile">
        <div>
          {/* <div className="profileImgContainer"> */}
          <ProfileImg img={profilephoto} />
          {/* </div> */}
          <h1>@user12345</h1>
          <button className="profileButton">Profile</button>
          <h2>Switch accounts</h2>
          <h2>Manage account</h2>
          <h2>Activity</h2>
          <h2>Cards</h2>
          <h2>Theme</h2>
          <h2>Settings</h2>
          <h2>Help</h2>
          <h2>Shortcuts</h2>
          <h2>Log out</h2>
        </div>
        <div>
          <div className="aboutContainer">
            <h1> About you</h1>
            <Input label="Full Name" type="text" />
            <Input label="Public Name" type="text" />
            <Input label="Job Title" type="text" />
            <Input label="Department" type="text" />
            <Input label="Organization" type="text" />
            <Input label="Email address" type="text" />
            <Input label="Based in" type="text" />
            <Input label="Region" type="text" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
