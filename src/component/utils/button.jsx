import React from "react";
import { Vortex } from "react-loader-spinner";

const Button = (props) => {
  const buttonStyle = {
    backgroundColor: props.loading ? "#ccc" : "", 
    cursor: props.loading ? "not-allowed" : "pointer",
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
            width="50"
            ariaLabel="vortex-loading"
            style={{
              display: "inline-block",
              margint: "auto", 
              verticalAlign: "middle", 
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
