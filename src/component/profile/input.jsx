import React from "react";
import "./input.css";

export default function Input(props) {
  const validateInput = (value) => {
    const nameRegex = /^(?! )[A-Za-z]+(?: [A-Za-z]+)?$/;

    const jobTitleRegex =
      /^(?! )[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]](?:[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]]| [A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]])*[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]]$/;

    const departmentRegex =
      /^(?! )[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]](?:[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]]| [A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]])*[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]]$/;

    const organisationRegex =
      /^(?! )[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]](?:[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]]| [A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]])*[A-Za-z0-9&$@#!%^*()_+-=;:{}'"><>?~\\/[\]]$/;

    const basedInRegex = /^[^0-9\s][A-Za-z](?:[^\s]| [A-Za-z]){3,}$/;

    const regionRegex = /^[^0-9\s][A-Za-z](?:[^\s]| [A-Za-z]){4,}$/;

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
          maxLength={30}
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
