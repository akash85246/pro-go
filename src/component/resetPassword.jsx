import React, { useState } from "react";
import ProgressBar from "./progress";
import resetPasswordImage from "../assets/reset.svg";
import Button from "./button";
export default function Reset() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({
      ...formData,
      password: newPassword,
    });

    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (newPassword.length >= 8 && hasLetter && hasNumber) {
      setPasswordStrength("Strong");
    } else if (newPassword.length >= 6 && (hasLetter || hasNumber)) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Weak");
    }

    if (newPassword !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      document.getElementById("pass").style.display = "block";
    } else {
      document.getElementById("pass").style.display = "none";
      setPasswordMatchError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setFormData({
      ...formData,
      confirmPassword: newConfirmPassword,
    });

    if (formData.password !== newConfirmPassword) {
      setPasswordMatchError("Passwords do not match");
    } else {
      document.getElementById("pass").style.display = "none";
      setPasswordMatchError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      password: formData.password,
    };
    console.log("ResetPassword:", submittedData);
  };

  return (
    <>
      <ProgressBar circleCount={4} color={3} />

      <h1>Reset password</h1>
      <div className="Input">
        <label className="light">Password</label>
        <input
          type="password"
          name="password"
          className="input"
          required
          maxLength={15}
          minLength={5}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        {formData.password && (
          <div id="passwordStrength">Password Strength: {passwordStrength}</div>
        )}
      </div>
      <div className="Input">
        <label className="light">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          className="input"
          required
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          maxLength={15}
          minLength={5}
        />
      </div>
      <div id="pass">Passwords do not match</div>
      <Button
        type="submit"
        class="submit button register"
        label="Reset Password"
        onClick={(e) => handleSubmit(e, "register")}
      />
    </>
  );
}
