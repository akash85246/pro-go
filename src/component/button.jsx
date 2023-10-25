import React from "react";

const Button = (props) => {
  return (
    <input
      className={props.class}
      type={props.type}
      value={props.label}
      disabled={props.disabled}
    />
  );
};

export default Button;
