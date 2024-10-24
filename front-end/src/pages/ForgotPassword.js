import React, { useState } from "react";
import LogoPageTitle from "../components/LogoPageTitle";
// import Logo from "../assets/upload-image-placeholder.png";
import InputField from "../components/InputField";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [submittedEmail, setSubmittedEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleClick = (e) => {
    console.log(email);
    setSubmittedEmail(email);
  };
  return (
    <>
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Forgot Password?" />
      <div className="input-btn-container">
        <InputField
          inputfieldName="Email"
          value={email}
          handleChange={handleEmailChange}
        />

        <button className="submit-eamil-btn" onClick={handleClick}>
          Submit
        </button>
      </div>
      <div className="code-container">
        {submittedEmail && <div>We sent a code to {submittedEmail}</div>}
        {submittedEmail && (
            <div className="inputs">
              <input type="text" maxlength="1" oninput="moveFocus(this, 1)" />
              <input type="text" maxlength="1" oninput="moveFocus(this, 2)" />
              <input type="text" maxlength="1" oninput="moveFocus(this, 3)" />
              <input type="text" maxlength="1" oninput="moveFocus(this, 4)" />
            </div>
          ) && (
            <Link to="/">
              <button>Continue</button>
            </Link>
          )}

        <Link className="underlined" to="/login">
          Back to Login
        </Link>
      </div>
    </>
  );
}
