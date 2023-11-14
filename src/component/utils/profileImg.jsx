import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profileImg.css";
import userImg from "../../assets/profilePhoto.jpg";
import { useAuth } from "./authContext";

const photoUploadApi = "https://pro-go.onrender.com/api/upload-photo";
const getPhotoApi = "https://pro-go.onrender.com/api/get-photo";

export default function ProfileImg(props) {
  const { authToken } = useAuth();

  // Check if there is a stored photo in local storage
  const storedPhoto = localStorage.getItem("userPhoto");

  // Initialize the state with the stored photo or use the default userImg
  const [newPhoto, setNewPhoto] = useState(
    storedPhoto ? JSON.parse(storedPhoto) : userImg
  );

  // Function to handle file change (when user selects a new photo)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        setNewPhoto(reader.result);
        props.onPhotoChange(reader.result);
      };

      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("email", props.email);

        // Upload the photo to the server
        const response = await axios.post(photoUploadApi, formData, {
          headers: {
            "auth-token": authToken,
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  // Function to fetch the user's photo from the server
  const getPhoto = async () => {
    try {
      const response = await axios.get(getPhotoApi, {
        headers: {
          "auth-token": authToken,
        },
      });

      if (response.data && response.data.photoUrl) {
        // Process the photo URL from the server response
        const photo = response.data.photoUrl.replace(
          /public/g,
          "https://pro-go.onrender.com"
        );

        // Update the state directly with the new photo URL
        setNewPhoto(photo);

        console.log(photo);
      } else {
        // Set default photo if the response is not as expected
        console.error("Invalid response format for photo");
        setNewPhoto(userImg); // Set the default photo here
      }
    } catch (error) {
      console.error("Error fetching photo:", error);

      // Set default photo in case of an error
      setNewPhoto(userImg);
    }
  };

  // Effect to update local storage when newPhoto changes
  useEffect(() => {
    localStorage.setItem("userPhoto", JSON.stringify(newPhoto));
  }, [newPhoto]);

  // Effect to fetch the user's photo when authToken changes
  useEffect(() => {
    if (authToken) {
      getPhoto();
    }
  }, [authToken]);

  return (
    <div className="profileImgContainer">
      <div className="profileImg">
        <img src={newPhoto} alt="Profile Image" />
      </div>
      {props.isEditing && (
        <>
          <label htmlFor="fileInput" className="changePhotoButton">
            Choose File
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="changePhotoButton"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
