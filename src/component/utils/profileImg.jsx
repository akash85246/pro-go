import React, { useState, useRef } from "react";
import editIcon from "../../assets/edit-solid.svg";
import "./profileImg.css";
import axios from "axios";
import userImg from "../../assets/profilePhoto.png";

export default function ProfileImg(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const inputRef = useRef();

  const uploadNewPhoto = async () => {
    if (newPhoto) {
      const formData = new FormData();
      formData.append("photo", newPhoto);
      formData.append("email", "akash22164033@akgec.ac.in");

      try {
        const response = await axios.post(
          "https://pro-go.onrender.com/api/upload-photo",
          formData
        );

        if (response.status === 200) {
          console.log("Photo uploaded successfully");
        } else {
          console.error("Failed to upload photo");
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  return (
    <div
      className="profileImgContainer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`profileImg ${isHovered ? "hovered" : ""}`}>
        <img src={newPhoto || userImg} alt="Profile Image" />
        {/* {isHovered && !props.isNavbar && (
          <div>
            <img src={editIcon} alt="Edit" />
          </div>
        )} */}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        className="changePhotoButton"
        onChange={(e) => setNewPhoto(URL.createObjectURL(e.target.files[0]))}
      />
      {/* {isHovered && !props.isNavbar && (
        <div className="button">
          <button
            className="editButton"
            onClick={() => inputRef.current.click()}
          >
            edit
          </button>
          <button className="saveButton" onClick={uploadNewPhoto}>
            Save Photo
          </button>
        </div>
      )} */}
    </div>
  );
}
