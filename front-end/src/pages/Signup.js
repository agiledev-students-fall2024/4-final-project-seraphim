import React from "react";
import "./Signup.css";
import LogoPageTitle from "../components/LogoPageTitle";
// import Logo from "../assets/upload-image-placeholder.png";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";

export default function Signup() {
  function handleClick() {
    console.log("click");
  }
  return (
    <>
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Create an account" />
      <InputField inputfieldName="Name" />
      <InputField inputfieldName="Username" />
      <InputField inputfieldName="Email" inputType="email" />
      <InputField inputfieldName="Password" inputType="password" />
      {/* <SubmitButton placeholder="Signup" link="/" /> */}
      <div className="btn-container">
        <button className="signup-btn" onClick={handleClick}>
          Signup
        </button>
      </div>
      <div className="have-account">
        Already have an account?{" "}
        <Link className="underlined" to="/login">
          Login
        </Link>
      </div>
    </>
  );
}
