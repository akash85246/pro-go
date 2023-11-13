import Navbar from "../utils/navbar";
import { useAuth } from "../utils/authContext";

import "./profile.css";
import Footer from "../utils/footer";
import Input from "./input";
import profilephoto from "../../assets/profilePhoto.jpg";
import ProfileImg from "../utils/profileImg";
import { useState } from "react";
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { authToken } = useAuth();

  const [profileData, setProfileData] = useState({
    fullName: "",
    publicName: "",
    jobTitle: "",
    department: "",
    organization: "",
    emailAddress: "",
    basedIn: "",
    region: "",
  });
  const [newPhoto, setNewPhoto] = useState(null);
  const handleInputChange = (label, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const handlePhotoChange = (photoData) => {
    setNewPhoto(photoData);
  };

  return (
    <>
      <Navbar newPhoto={newPhoto} onPhotoChange={handlePhotoChange} />
      <div className="mainContainerProfile">
        <div>
          {/* <div className="profileImgContainer"> */}
          <ProfileImg
            img={newPhoto || profilephoto}
            isEditing={isEditing}
            onPhotoChange={handlePhotoChange}
          />
          {/* </div> */}
          <div className="infoContainer">
            <h1>{profileData.fullName}</h1>
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
        </div>
        <div>
          <div className="aboutContainer">
            <h1> About you</h1>
            <Input
              label="Full Name"
              type="text"
              value={profileData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              disabled={!isEditing}
            />
            {/* <Input
              label="Public Name"
              type="text"
              value={profileData.publicName}
              onChange={(e) => handleInputChange("publicName", e.target.value)}
              disabled={!isEditing}
            /> */}
            <Input
              label="Job Title"
              type="text"
              value={profileData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Department"
              type="text"
              value={profileData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Organization"
              type="text"
              value={profileData.organization}
              onChange={(e) =>
                handleInputChange("organization", e.target.value)
              }
              disabled={!isEditing}
            />
            <Input
              label="Email address"
              type="text"
              value={profileData.emailAddress}
              onChange={(e) =>
                handleInputChange("emailAddress", e.target.value)
              }
              disabled={!isEditing}
            />
            <Input
              label="Based in"
              type="text"
              value={profileData.basedIn}
              onChange={(e) => handleInputChange("basedIn", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Region"
              type="text"
              value={profileData.region}
              onChange={(e) => handleInputChange("region", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="changeEdit">
            {isEditing ? (
              <button onClick={handleSaveClick}>Save</button>
            ) : (
              <button onClick={handleEditClick}>Edit</button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
