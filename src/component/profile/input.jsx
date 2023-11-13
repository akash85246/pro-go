import React from "react";
import "./input.css";

export default function Input(props) {
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
      </div>
    </>
  );
}
