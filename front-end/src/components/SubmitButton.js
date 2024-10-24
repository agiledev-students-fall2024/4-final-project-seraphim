import React from "react";
import "./SubmitButton.css";
import { Link } from "react-router-dom";
function SubmitButton({ placeholder, link, handleClick }) {
  // function handleClick() {
  //   console.log("the button is clicked");
  // }
  return (
    <div className="submit-btn-div">
      <Link to={link}>
        <button className="submit-btn" onClick={handleClick}>
          {placeholder}
        </button>
      </Link>
    </div>
  );
}
export default SubmitButton;
