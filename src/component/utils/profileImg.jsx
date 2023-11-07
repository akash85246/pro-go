import React, { useState, useRef } from "react";
import editIcon from "../../assets/edit-solid.svg";
import "./profileImg.css";
import axios from "axios"; // Import Axios

export default function ProfileImg(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const inputRef = useRef();

  const handleFileChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

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
        <img src={props.img} alt="Profile Image" />
        {isHovered && (
          <div className="editButton" onClick={() => inputRef.current.click()}>
            <img src={editIcon} alt="Edit" />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {isHovered && <button onClick={uploadNewPhoto}>Change Photo</button>}
    </div>
  );
}
