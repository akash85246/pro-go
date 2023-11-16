import React from "react";
import "./input.css";

export default function Input(props) {
  const validateInput = (value) => {
    const nameRegex = /^(?! )[A-Za-z]+(?: [A-Za-z]+)?$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const jobTitleRegex = /^[A-Za-z\s]{3,}$/;
    const departmentRegex = /^[A-Za-z\s]{3,}$/;
    const organisationRegex = /^[A-Za-z\s]{3,}$/;
    const basedInRegex = /^[A-Za-z\s]{3,}$/;
    const regionRegex = /^[A-Za-z\s]{3,}$/;

    switch (props.label) {
      case "Full Name":
        return nameRegex.test(value) ? "" : "Invalid input";

      case "Job Title":
        return jobTitleRegex.test(value) ? "" : "Invalid job title";

      case "Department":
        return departmentRegex.test(value) ? "" : "Invalid department";

      case "Organization":
        return organisationRegex.test(value) ? "" : "Invalid organization";

      case "Based in":
        return basedInRegex.test(value) ? "" : "Invalid location";

      case "Region":
        return regionRegex.test(value) ? "" : "Invalid region";

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
      <div className="errorContainerProfile">
        {props.errorMessage && <p className="error">{props.errorMessage}</p>}
        {!props.disabled && validateInput(props.value) && (
          <p className="errorProfile" style={{ display: "block" }}>
            {validateInput(props.value)}
          </p>
        )}
      </div>
    </>
  );
}
