// Input.js

import React from "react";
import "./input.css";

export default function Input(props) {
  const validateInput = (value) => {
    // Example regex patterns, modify as needed for your validation rules
    const nameRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

    // Check the input label and apply the appropriate regex pattern
    switch (props.label) {
      case "Full Name":
      case "Job Title":
      case "Department":
      case "Organization":
      case "Based in":
      case "Region":
        return nameRegex.test(value) ? "" : "Invalid input";

      case "Email address":
        return emailRegex.test(value) ? "" : "Invalid email address";

      default:
        return "";
    }
  };

  return (
    <>
      <div className="inputContainerProfile">
        <label>{props.label}</label>
        <input
          type={props.type}
          className="inputProfile"
          value={props.value || ""}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </div>
      <div className="errorContainer1">
        {props.errorMessage && <p className="error">{props.errorMessage}</p>}
        {!props.disabled && validateInput(props.value) && (
          <p className="error" style={{ display: "block" }}>
            {validateInput(props.value)}
          </p>
        )}
      </div>
    </>
  );
}
