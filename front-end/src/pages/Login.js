import React, { useState } from "react";
import "./Login.css";
import InputField from "../components/InputField";
import LogoPageTitle from "../components/LogoPageTitle";
import SubmitButton from "../components/SubmitButton";
// import Logo from "../assets/upload-image-placeholder.png";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleBtnClick(e) {
    e.preventDefault();
    // setUsername(username);
    // setPassword(password);
    console.log("Login as: ", username, password);
    // console.log("Login as: whatwhat");
    navigate("/");
  }

  return (
    <>
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Welcome Back" />
      <InputField
        inputfieldName="Username"
        inputValue={username}
        handleChange={handleUsernameChange}
      />
      <InputField
        inputfieldName="Password"
        inputType="password"
        inputValue={password}
        handleChange={handlePasswordChange}
      />
      <SubmitButton placeholder="Login" link="/" handleClick={handleBtnClick} />
      <Link className="forgot-password underlined" to="/forgotpassword">
        I forgot my password
      </Link>
      <div className="dont-have-account">
        Don't have an account?{" "}
        <Link className="underlined" to="/signup">
          Create an account
        </Link>
      </div>
    </>
  );
}
