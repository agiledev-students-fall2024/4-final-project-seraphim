import React from "react";
import "./ResetPassword.css";
import LogoPageTitle from "../components/LogoPageTitle";
// import Logo from "../assets/upload-image-placeholder.png";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <>
      <LogoPageTitle
        logoSrc="./seraphim-logo.PNG"
        title="Set New Password"
      ></LogoPageTitle>
      <div className="passwords">
        <div className="input-container">
          <label>password</label>
          <input className="password" type="password"></input>
        </div>
        <div className="input-container">
          <label>password</label>
          <input className="confirm-password" type="password"></input>
        </div>
      </div>
      <div className="btn-link-container">
        <Link to="/">
          <button>Reset Password</button>
        </Link>
        <Link to="login" className="underlined login-link">
          Back to Login
        </Link>
      </div>
    </>
  );
}
