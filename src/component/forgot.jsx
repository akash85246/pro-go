import React, { useState } from "react";
import Button from "./button";
import ProgressBar from "./progress";
import Reset from "./resetPassword";

export default function Forgotten(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState(""); // State to store OTP
  const [loginWithPhone, setLoginWithPhone] = useState(false);

  const handlePhoneSubmit = () => {
    document.querySelector(".num").style.display = "none";
    console.log("Entered Phone Number:", phoneNumber);
    setOtpMode(true);
  };

  const handleOtpSubmit = () => {
    console.log("Entered OTP:", otp);
  };

  return (
    <div className="loginContainer right">
      <ProgressBar circleCount={4} color={2} />
      <div className="num">
        <h1>Enter Registered Number</h1>
        <p className="light">
          A text with a 6-digit code has been sent to your{" "}
          {loginWithPhone ? "entered number" : "email address"}.
        </p>
        <div className="Input">
          <div className="loginWith">
            <label className="light">
              {loginWithPhone ? "Phone number" : "Email address"}
            </label>
            <a
              className="blue loginWith"
              onClick={() => setLoginWithPhone(!loginWithPhone)}
            >
              {loginWithPhone ? "Login with Email" : "Login with Phone number"}
            </a>
          </div>
          <input
            type="text"
            className="input"
            value={phoneNumber}
            maxLength={10}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Button
            type="submit"
            class="submit button number"
            label="Submit"
            onClick={handlePhoneSubmit}
          />
        </div>
      </div>

      {otpMode && (
        <>
          <h1>Enter verification code</h1>
          <p className="light">
            A text with digit code has been sent to{" "}
            {loginWithPhone
              ? `+XXXXXXX${phoneNumber.slice(7, 10)}`
              : "your email address"}
            .
          </p>

          <div className="Input">
            <label className="light">Enter OTP</label>
            <input
              type="text"
              className="input"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button
              type="submit"
              class="submit button otp"
              label="Submit OTP"
              onClick={handleOtpSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
}
