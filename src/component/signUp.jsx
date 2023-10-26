import React, { useState } from "react";
import RememberMeCheckbox from "./rememberMe";
import Terms from "./terms";
import Button from "./button";
import axios from "axios";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");

  const signEndpoint = "https://pro-go.onrender.com/api/auth/sign-up/";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  function validateForm(event) {
    event.preventDefault();
    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const phoneNumberValue = document.getElementById("phoneNumber").value;

    const mailCheck = /^[\w\.-]+@[\w\.-]+\.\w+/;
    const nameCheck = /^[A-Za-z. ]{3,30}( [A-Za-z. ]{3,30})*$/;
    const numberCheck = /^[789]\d{9}$/;

    if (!nameCheck.test(nameValue) && nameValue !== "") {
      console.log("h1");
      document.getElementById("nameError").style.display = "block";
      document.getElementById("nameError").innerHTML =
        "**Name cannot contain numbers and should be more than 2 characters";
    } else {
      console.log("h2");
      setName(nameValue);
      document.getElementById("nameError").style.display = "none";
    }

    if (!mailCheck.test(emailValue) && emailValue !== "") {
      document.getElementById("emailError").style.display = "block";
      document.getElementById("emailError").innerHTML =
        "**Email should have '@' and '.'";
    } else {
      setEmail(emailValue);
      document.getElementById("emailError").style.display = "none";
    }

    if (!numberCheck.test(phoneNumberValue) && phoneNumberValue !== "") {
      document.getElementById("numberError").style.display = "block";
      document.getElementById("numberError").innerHTML =
        "**Phone Number: Start with 7, 8, or 9, and use 10 digits only.";
    } else {
      setPhoneNumber(phoneNumberValue);
      document.getElementById("numberError").style.display = "none";
    }
  }

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

  async function handleSubmit(e) {
    e.preventDefault();
    const submittedData = {
      name: name,
      email: email,
      password: formData.password,
    };
    console.log("Registering Account:", submittedData);
    try {
      // console.log(userData);
      const response = await axios.post(signEndpoint, submittedData);
      const authToken = response.data.token;
      console.log("Received auth token:", authToken);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server responded with an error:", error.response.data);
        if (error.response.data.message === "No user exist with this email") {
          setEmailError("No user exists with this email");
        }
      } else if (error.request) {
        console.error("No response received. Network error:");
      } else {
        console.error("Error setting up the request:");
      }
    }
  }

  return (
    <div className="loginContainer right">
      <h1 style={{ textAlign: "left" }}>Create account</h1>

      <div className="Input">
        <label className="light">Username</label>
        <input
          type="text"
          name="name"
          className="input"
          id="name"
          maxLength={15}
          minLength={3}
          required
          onChange={validateForm}
        />
        <span id="nameError">
          **Name cannot contain numbers and should be more than 2 characters
        </span>
      </div>

      <div className="emailNumber">
        <div className="Input">
          <label className="light">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            maxLength={50}
            className="input sui"
            required
            onChange={validateForm}
          />
          <span id="emailError">**Email should have '@' and '.'</span>
        </div>
        <div className="Input">
          <label className="light">Phone Number</label>
          <input
            type="text"
            name="number"
            maxLength={10}
            id="phoneNumber"
            className="input sui"
            required
            onChange={validateForm}
          />
          <span id="numberError">
            **Phone Number should start with 7/8/9 and should have 10 digits, no
            characters allowed
          </span>
        </div>
      </div>

      <div className="Input createPassword">
        <div>
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
      </div>
      <div>
        <span id="pass">Passwords do not match</span>
        {formData.password && (
          <div id="passwordStrength">Password Strength: {passwordStrength}</div>
        )}
      </div>
      <RememberMeCheckbox class="signUpCheckbox" divClass="sic" />
      <Terms />
      <Button
        type="submit"
        class="submit button register"
        label="Register Account"
        onClick={(e) => handleSubmit(e, "register")}
      />
      <Button
        type="submit"
        class="submit button google"
        label="Sign-in with Google"
        onClick={handleSubmit}
      />
    </div>
  );
}

export default SignUpForm;
