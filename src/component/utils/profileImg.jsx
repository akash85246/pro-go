import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profileImg.css";
import userImg from "../../assets/profilePhoto.jpg";
import { useAuth } from "./authContext";

export default function ProfileImg(props) {
  const photoUploadApi = "https://pro-go.onrender.com/api/upload-photo";
  const getPhotoApi = "https://pro-go.onrender.com/api/get-photo";
  const storedPhoto = localStorage.getItem("userPhoto");
  const [newPhoto, setNewPhoto] = useState(
    storedPhoto ? JSON.parse(storedPhoto) : userImg
  );
  const { authToken } = useAuth();

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

  const getPhoto = async () => {
    try {
      const response = await axios.get(getPhotoApi, {
        headers: {
          "auth-token": authToken,
        },
      });
      const photo = response.data.photoUrl.replace(
        /public/g,
        "https://pro-go.onrender.com"
      );
      setNewPhoto(photo);
      console.log(photo);
      console.log(newPhoto);
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };
  console.log(newPhoto);
  useEffect(() => {
    localStorage.setItem("userPhoto", JSON.stringify(newPhoto));
  }, [newPhoto]);

  useEffect(() => {
    if (props.email && authToken) {
      getPhoto();
    }
  }, [props.email, authToken]);

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
