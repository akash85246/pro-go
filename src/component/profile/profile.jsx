import Navbar from "../utils/navbar";
import { useAuth } from "../utils/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import Footer from "../utils/footer";
import Input from "./input";
import profilephoto from "../../assets/profilePhoto.jpg";
import ProfileImg from "../utils/profileImg";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
export default function Profile() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const { authToken, updateAuthToken } = useAuth();
  const navigate = useNavigate();
  console.log(authToken);
  function logOut() {
    localStorage.clear();
    console.log("Local storage cleared");
    console.log("logged Out");
    console.log(authToken);
    updateAuthToken(null);
    navigate("/");
  }

  const [profileData, setProfileData] = useState({
    fullName: "",
    // publicName: "",
    jobTitle: "",
    department: "",
    organisation: "",
    emailAddress: "",
    basedIn: "",
    region: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://pro-go.onrender.com/api/get-user-details",
          {
            method: "GET",
            headers: {
              "auth-token": authToken,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.user);
          setProfileData({
            fullName: data.user.fullName,
            // publicName: "",
            jobTitle: data.user.jobTitle,
            department: data.user.department,
            organisation: data.user.organisation,
            emailAddress: data.user.email,
            basedIn: data.user.basedIn,
            region: data.user.region,
          });
        } else {
          console.error("Error fetching user details");
        }
      } catch (error) {
        toast({
          title: "Error Notification!",
          description: error.response?.data?.message || "An error occurred",
          status: "error",
          position: "top-centre",
          duration: 3000,
          isClosable: true,
          render: () => (
            <Box p={3} color="white" bg="red.500" borderRadius="md">
              <WarningIcon mr={3} />
              {error.response?.data?.message || "An error occurred"}
            </Box>
          ),
        });
        console.error("Error fetching user details", error);
      }
    };

    fetchUserData();
  }, [authToken]);

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

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://pro-go.onrender.com/api/add-user-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({
            organisation: profileData.organisation,
            basedIn: profileData.basedIn,
            department: profileData.department,
            fullName: profileData.fullName,
            jobTitle: profileData.jobTitle,
            region: profileData.region,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(profileData);
        if (data.success) {
          console.log("User details saved successfully");
          console.log(profileData);
          console.log(authToken);
        } else {
          console.error("Error saving user details:", data.message);
        }
      } else {
        console.error("Error saving user details");
      }
    } catch (error) {
      toast({
        title: "Error Notification!",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
        position: "top-centre",
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box p={3} color="white" bg="red.500" borderRadius="md">
            <WarningIcon mr={3} />
            {error.response?.data?.message || "An error occurred"}
          </Box>
        ),
      });
      console.error("Error saving user details", error);
    } finally {
      setLoading(false);
    }
    setIsEditing(false);
  };

  const handlePhotoChange = (photoData) => {
    setNewPhoto(photoData);
  };

  return (
    <>
      <Navbar
        newPhoto={newPhoto}
        onPhotoChange={handlePhotoChange}
        showProfilePhoto={false}
      />
      <div className="mainContainerProfile">
        <div>
          {/* <div className="profileImgContainer"> */}
          <ProfileImg
            img={newPhoto || profilephoto}
            isEditing={isEditing}
            onPhotoChange={handlePhotoChange}
            email={profileData.emailAddress}
          />
          {/* </div> */}
          <div className="infoContainer">
            <h1>{profileData.fullName}</h1>
            {/* <button className="profileButton">Profile</button>
            <h2>Switch accounts</h2>
            <h2>Manage account</h2>
            <h2>Activity</h2>
            <h2>Cards</h2>
            <h2>Theme</h2>
            <h2>Settings</h2>
            <h2>Help</h2>
            <h2>Shortcuts</h2> */}
            <h2 onClick={logOut}>Log out</h2>
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
              value={profileData.organisation}
              onChange={(e) =>
                handleInputChange("organisation", e.target.value)
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
              disabled={true}
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
              <Button
                type="submit"
                class="edit"
                label="Save"
                loading={loading}
                onClick={handleSaveClick}
              />
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
