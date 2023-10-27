import React from "react";
import Button from "./button";
export default function Verification() {
  return (
    <>
      <div className="container">
        <div className="loginContainer left ">
          <img
            src="../src/assets/verification.svg"
            className="loginImage"
            alt="Your Image Alt Text"
          />
        </div>
        <div className="loginContainer right verify">
          <h1>Enter verification code</h1>
          <p className="light">
            a text with 6-digit code has been sent to your email
          </p>
          <div className="Input">
            <label className="light">Enter verification code</label>
            <input type="text" className="input verifyInput"></input>
          </div>
          <Button type="submit" class="submit button" label="Submit" />
          <div>Use another email</div>
        </div>
      </div>
    </>
  );
}
