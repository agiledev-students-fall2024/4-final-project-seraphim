import React, { useEffect, useState } from "react";
import TitleAndDescription from "../components/TitleAndDescription";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

const EditProfile = (props) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    about: "",
    email: "",
    profilePicture: "default_pic.png",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/profile")
      .then(response => {
        const newUser = response.data;
        setUser((prevUser) => ({
          ...prevUser,
          ...newUser
      }));
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user profile.");
      });
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axiosInstance.post("/upload-pic", formData)
        .then(response => {
          toast.success("Profile picture uploaded successfully!");
          setUser(prevUser => ({
            ...prevUser,
            profilePicture: `${process.env.REACT_APP_SERVER_HOSTNAME}/${response.data.file.path}`,
          }));
        })
        .catch(error => {
          console.error("Upload error:", error);
          toast.error("Failed to upload profile picture.");
        });
    }
  }, [selectedFile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleProfilePicInput(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function handleSaveChanges(e) {
    e.preventDefault();

    axiosInstance.post("/profile", user)
      .then(response => {
        toast.success("Profile updated successfully!");
        navigate("/profile"); 
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.");
      });
  }

  return (
    <div className="w-[90%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
      <TitleAndDescription
        title="Edit Your Profile"
        description="Modify account information like your name and email."
      />

      <div className="flex flex-col justify-center items-center w-[100%] mx-auto gap-2 p-6 rounded-md md:w-[80%] lg:w-[60%]">
        <h2 className="text-xl text-ebony-600 text-center mb-2">
          <img 
            className="w-32 h-32 md:w-44 md:h-44 rounded-lg object-cover"
            src={user.profilePicture} alt="profile pic"
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.src = '/default_pic.png'; 
            }}
          />
        </h2>
        <input type="file" onChange={handleProfilePicInput} />

        <div className="w-[80%] flex flex-col gap-4">
          <InputField
            inputfieldName="Username"
            inputType="text"
            handleChange={handleChange}
            inputValue={user.username}
            name="username"
          />
          <InputField
            inputfieldName="Name"
            inputType="text"
            handleChange={handleChange}
            inputValue={user.name}
            name="name"
          />
          <InputField
            inputfieldName="Email"
            inputType="email"
            handleChange={handleChange}
            inputValue={user.email}
            name="email"
          />
          <InputField
            inputfieldName="About"
            inputType="textarea"
            handleChange={handleChange}
            inputValue={user.about}
            name="about"
          />
        </div>
      </div>

      <div className="w-[60%] flex justify-center md:w-[40%] lg:w-[30%]">
        <SubmitButton placeholder="Save" handleClick={handleSaveChanges} />
      </div>
    </div>
  );
};

export default EditProfile;
