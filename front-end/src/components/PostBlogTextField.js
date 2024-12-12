import React, { useState } from "react";
import "./PostBlogTextField.css";
import DropdownMenu from "./DropdownMenu";

const PostBlogTextField = ({ onCancel, onPost, communities }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [attachedImage, setAttachedImage] = useState(null);

  const handlePostClick = () => {
    if (onPost) {
      onPost(postContent, selectedOption, attachedImage);
    }
    setPostContent("");
    setSelectedOption("");
    setAttachedImage(null);
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
    setPostContent("");
    setSelectedOption("");
    setAttachedImage(null);
  };

  const handleAttachImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedImage(file);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="post-blog-container">
      <div className="header">
        <button onClick={handleCancelClick} className="mt-4 bg-rose text-lavender_blush-900 border-[1px] border-rose py-1 px-4 rounded-md hover:bg-lavender_blush-900 hover:text-rose">
          Cancel
        </button>
        <button onClick={handlePostClick} className="mt-4 bg-rose text-lavender_blush-900 border-[1px] border-rose py-1 px-4 rounded-md hover:bg-lavender_blush-900 hover:text-rose">
          Post
        </button>
      </div>
      <div className="w-[80%] m-auto">
        <DropdownMenu
          name="your-communities"
          label="Your Communities"
          options={communities}
          onChange={handleDropdownChange}
          value={selectedOption}
        />
      </div>
      <textarea
        placeholder="Write your post here..."
        className="usertext"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      {attachedImage && (
        <img
          src={URL.createObjectURL(attachedImage)}
          alt="Attached"
          className="w-[80%] m-auto rounded-md object-cover bg-ebony-800"
        />
      )}
      <div className="footer">
        <label htmlFor="attach-image" className="mt-4 bg-rose text-lavender_blush-900 border-[1px] border-rose py-1 px-4 rounded-md hover:bg-lavender_blush-900 hover:text-rose">
          Attach Image
          <input
            type="file"
            id="attach-image"
            onChange={handleAttachImage}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

export default PostBlogTextField;

