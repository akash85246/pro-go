import React from "react";

function RememberMeCheckbox(props) {
  return (
    <div className={props.divClass} style={{ width: "100%" }}>
      <input type="checkbox" className={props.class} />
      <label className="light">Remember me</label>
    </div>
  );
}

export default RememberMeCheckbox;
