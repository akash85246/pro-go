import React, { useState } from "react";
import Button from "./button";
import ProgressBar from "./progress";
import Reset from "./resetPassword";

export default function Forgotten(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpMode, setOtpMode] = useState(false);

  const handlePhoneSubmit = () => {
    console.log("Entered Phone Number:", phoneNumber);
    setOtpMode(true);
  };

  return (
    <div className="loginContainer right">
      <ProgressBar circleCount={4} color={2} />
      {otpMode ? (
        <Reset /> 
      ) : (
        <>
          <h1>Enter Registered Number</h1>
          <p className="light">
            A text with a 6-digit code has been sent to your entered number.
          </p>
          <div className="Input">
            <label className="light">Enter Phone number</label>
            <input
              type="text"
              className="input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="submit button" {/* Use className, not class */}
              label="Submit"
              onClick={handlePhoneSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
}
