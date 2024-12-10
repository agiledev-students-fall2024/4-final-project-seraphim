// C14
import React from 'react';
import './BackButton.css';
import { IoIosArrowBack } from "react-icons/io";

const BackButton = ({ backButtonHandler }) => {
    return (
        <button className="back-button absolute top-7 left-5 z-0" onClick={backButtonHandler}>
            <IoIosArrowBack className="arrow-button"/>
        </button>
    );
};

export default BackButton;
