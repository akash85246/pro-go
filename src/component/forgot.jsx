import React, { useState } from "react";
import Button from "./button";
import ProgressBar from "./progress";
import Reset from "./resetPassword";

export default function Forgotten(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(""); // State to store phone number error
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State to store email error

  function validateEmail(inputEmail) {
    const emailCheck = /^[\w\.-]+@[\w\.-]+\.\w+/;

    if (!emailCheck.test(inputEmail) && inputEmail !== "") {
      document.querySelector("#numberError").style.display = "block";
      setEmailError("**Email should have '@' and '.'");
    } else {
      document.querySelector("#numberError").style.display = "none";
      setEmail(inputEmail);
    }
  }
  function validatePhoneNumber(inputPhoneNumber) {
    const numberCheck = /^[789]\d{9}/;

    if (!numberCheck.test(inputPhoneNumber) && inputPhoneNumber !== "") {
      document.querySelector("#numberError").style.display = "block";
      setPhoneNumberError(
        "**Phone Number should start with 7/8/9 and should have 10 digits, no characters allowed"
      );
    } else {
      document.querySelector("#numberError").style.display = "none";

      setPhoneNumber(inputPhoneNumber);
    }
  }

  const handlePhoneSubmit = () => {
    document.querySelector(".num").style.display = "none";
    console.log("Entered Phone Number:", phoneNumber);
    setOtpMode(true);
  };

  const handleOtpSubmit = () => {
    console.log("Entered OTP:", otp);
    setOtpSubmitted(true);
  };

  const handleResendOTP = () => {
    setOtpResent(true);
  };

  return (
    <div className="loginContainer right">
      {otpSubmitted ? (
        <Reset />
      ) : (
        <>
          <ProgressBar circleCount={4} color={2} />
          <div className="num">
            <h1>Enter Registered Number</h1>
            <p className="light">
              A text with a 6-digit code has been sent to your{" "}
              {loginWithPhone ? "entered number" : "email address"}.
            </p>
            {otpResent ? (
              <Button
                type="button"
                class="blue"
                label="Resend OTP"
                onClick={handleResendOTP}
              />
            ) : null}
            <div className="Input">
              <div className="loginWith">
                <label className="light">
                  {loginWithPhone ? "Phone number" : "Email address"}
                </label>
                <a
                  className="blue loginWith"
                  onClick={() => setLoginWithPhone(!loginWithPhone)}
                >
                  {loginWithPhone ? "Use Email" : "Use Phone number"}
                </a>
              </div>
              <input
                type="text"
                className="input"
                maxLength={10}
                onChange={(event) => {
                  loginWithPhone
                    ? validatePhoneNumber(event.target.value)
                    : validateEmail(event.target.value);
                }}
                required
              />
              <div>
                <span id="numberError">
                  {loginWithPhone ? phoneNumberError : emailError}
                </span>
              </div>
              <Button
                type="submit"
                class="submit button number"
                label="Submit"
                onClick={handlePhoneSubmit}
              />
            </div>

            <div>
              <span id="numberError">
                {loginWithPhone ? phoneNumberError : emailError}
              </span>
            </div>
            <Button
              type="submit"
              class="submit button number"
              label="Submit"
              onClick={handlePhoneSubmit}
            />
          </div>
        </>
      )}
      {otpMode && !otpSubmitted && (
        <>
          <h1>Enter verification code</h1>
          <p className="light">
            A text with digit code has been sent to{" "}
            {loginWithPhone
              ? `+XXXXXXX${phoneNumber.slice(7, 10)}`
              : "your email address"}
            .
          </p>
          {otpResent ? (
            <Button
              type="button"
              class="blue"
              label="Resend OTP"
              onClick={handleResendOTP}
            />
          ) : null}
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
