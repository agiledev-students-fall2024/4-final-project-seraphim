import React, { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios";
import './CreateCommunity.css';

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [communityPicture, setCommunityPicture] = useState("");
  const fileField = React.useRef(null);

  const handleCancelClick = () => {
    setDescription("");
    setCommunityPicture("");
    setName(null);
  };

  function handleCreateCommunity(e) {
    e.preventDefault();

    //sends name, description, and picture to the back-end as formdata
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", communityPicture);

    axiosInstance
      .post("/create-community", formData)
      .then((response) => {
        console.log("New community:", response.data)
        toast.success("Community created successfully!");

        //resets the name and description form fields to empty  
        setName("")
        setDescription("")

        //reset file upload 
        if (fileField.current) {
          fileField.current.value = ""
        }

      })
      .catch((err) => {
        toast.error("Failed to create community.");
      })
  }

  function handlePictureUpload(e) {
    const file = e.target.files[0];
    if (file === undefined) {
      toast.error("Failed to upload picture.")
    }
    else {
      setCommunityPicture(file);
      toast.success("Picture uploaded successfully!");
    }
  }

  return (
    <div className="community-page-container">
    <h1 className="text-xl font-bold text-ebony-700 text-center pb-4">Create Community</h1>
    <div className="create-community-container">
      <div className="header">
        <button
          onClick={handleCancelClick}
          className="mt-4 bg-rose text-lavender_blush-900 border-[1px] border-rose py-1 px-4 rounded-md hover:bg-lavender_blush-900 hover:text-rose"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateCommunity}
          className="mt-4 bg-rose text-lavender_blush-900 border-[1px] border-rose py-1 px-4 rounded-md hover:bg-lavender_blush-900 hover:text-rose"
        >
          Create
        </button>
      </div>
      <div className="w-[85%] flex flex-col gap-1 m-auto">
        <InputField
          inputfieldName="Community Name"
          handleChange={(e) => setName(e.target.value)}
          inputValue={name}
        />
        <InputField
          inputfieldName="Description"
          handleChange={(e) => setDescription(e.target.value)}
          inputValue={description}
        />
        <div className="flex flex-col justify-center text-center">
          <label
            htmlFor="community-image"
            className="mt-4 bg-rose text-lavender_blush-900 border-[1px] border-rose py-2 px-6 rounded-md hover:bg-lavender_blush-900 hover:text-rose"
          >
            Upload a Community Picture
            <input
              type="file"
              id="community-image"
              className="hidden"
              onChange={handlePictureUpload}
              ref={fileField}
            />
          </label>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateCommunity;
