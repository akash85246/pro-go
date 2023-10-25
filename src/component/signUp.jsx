import React from "react";
import RememberMeCheckbox from "./rememberMe";
import Terms from "./terms";
import Button from "./button";

function SignUpForm() {
  console.log("hi");
  return (
    <div className="loginContainer right">
      <h1>Create account</h1>

      <div className="Input">
        <label>Username</label>
        <input type="text" className="input sui"></input>
      </div>
      <div className="Input">
        <label>Email or phone number</label>
        <input type="text" className="input sui"></input>
      </div>
      <div className="Input createPassword">
        <div>
          <label>Password</label>
          <input type="password" className="input "></input>
        </div>
        <div>
          <label>Confirm password</label>
          <input type="password" className="input "></input>
        </div>
      </div>

      <RememberMeCheckbox class="signUpCheckbox" divClass="sic" />
      <Terms />
      <Button
        type="submit"
        class="submit button register"
        label="Register Account"
      />
      <Button
        type="submit"
        class="submit button google"
        label="Sign-in with google"
      />
    </div>
  );
}

export default SignUpForm;
