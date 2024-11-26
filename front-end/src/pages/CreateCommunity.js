import React, { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [communityPicture, setCommunityPicture] = useState("");

  function handleCreateCommunity(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", communityPicture);

    axiosInstance
      .post("/create-community", formData)
      .then((response) => {
        console.log("New community:", response.data)
        toast.success("Community created successfully!");
      })
      .catch((err) => {
        toast.error("Failed to create community.");
      })
  }

  function handlePictureUpload(e) {
    const file = e.target.files[0];
    if (file === undefined){
      toast.error("Failed to upload picture.")
    }
    else{
      setCommunityPicture(file);
      toast.success("Picture uploaded successfully!");
    }
  }

  return (
    <div className="w-[40%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
      <h1 className="text-xl text-ebony-700 text-center font-bold p-4">
        Create Community
      </h1>
      <div className="rounded bg-white p-8 border border-[#d9d9d9]">
        <InputField
          inputfieldName="Name"
          handleChange={(e) => setName(e.target.value)}
          inputValue={name}
        ></InputField>
        <InputField
          inputfieldName="Description"
          handleChange={(e) => setDescription(e.target.value)}
          inputValue={description}
        ></InputField>
        <div className="flex flex-col gap-1 w-full p-2">
          <label className="text-sm text-ebony-700 font-bold">
            Upload a Picture for Your Community:
          </label>
          <input type="file" className="pt-1" onChange={handlePictureUpload} />
        </div>
      </div>
      

      <SubmitButton
        placeholder="Create"
        handleClick={handleCreateCommunity}
      ></SubmitButton>
    </div>
  );
};

export default CreateCommunity;
