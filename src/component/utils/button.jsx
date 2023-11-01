import React from "react";
import { Vortex } from "react-loader-spinner";

const Button = (props) => {
  const buttonStyle = {
    backgroundColor: props.loading ? "#ccc" : "", // Change the color when loading
    cursor: props.loading ? "not-allowed" : "pointer", // Change cursor when loading
  };

  return (
    <div className="button-container">
      <button
        className={props.class}
        type={props.type}
        style={buttonStyle}
        disabled={props.disabled || props.loading} // Disable the button when loading
        onClick={props.onClick}
      >
        {props.loading ? (
          <Vortex
            visible={true}
            height="20"
            width="20"
            ariaLabel="vortex-loading"
            style={{
              display: "inline-block",
              marginLeft: "10px", // Adjust the margin to position the spinner as desired
              verticalAlign: "middle", // Adjust the vertical alignment as needed
            }}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        ) : (
          props.label
        )}
      </button>
    </div>
  );
};

export default Button;
