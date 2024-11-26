import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import BlogPost from "../components/BlogPost";
import DropdownMenu from "../components/DropdownMenu";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";
import { ColorContext } from "../ColorContext";
import { FontContext } from "../FontContext";
import { axiosInstance } from "../axios";

const Home = () => {
  const { updateColor } = useContext(ColorContext);
  const { updateFont } = useContext(FontContext);

  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const handleSearch = () => {
    console.log(`Searching for: ${searchInput}`);
    // axios
    //   .post(
    //     `${process.env.REACT_APP_SERVER_HOSTNAME}/api/blocked-users/`,
    //     { searchInput: searchInput },
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log("Failed to unblock user");
    //     console.log(err);
    //   });
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/home`, {
        withCredentials: true,
      })
      .then((response) => {
        const initialPosts = response.data.posts;

        // Check if a new post was added through the navigation state
        const newPost = location.state?.newPost;
        console.log(newPost);
        if (newPost) {
          setPosts([newPost, ...initialPosts]); // Add the new post to the top of the post list
        } else {
          setPosts(initialPosts);
        }
      })
      .catch((err) => {
        console.log("Failed to fetch posts.");
        console.error(err);
      });
  }, [location.state]);

  useEffect(() => {
    axiosInstance.get(`/color-mode`)
      .then((response) => {
        updateColor(response.data);
      })
      .catch((err) => {
        console.log(`Could not get data.`);
        console.error(err);
      });

    axiosInstance.get(`/font-size`)
      .then((response) => {
        updateFont(response.data);
      })
      .catch((err) => {
        console.log(`Could not get data.`);
        console.error(err);
      });
  }, [updateColor, updateFont]);

  return (
    <div className="w-[100%] flex flex-col justify-center items-center gap-6 p-8 mx-auto md:w-[90%]">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        onChange={handleChange}
      />

      <DropdownMenu
        name="communitySelect"
        label="Select a Community"
        options={["Community 1", "Community 2", "Community 3"]}
        onChange={() => {
          console.log("change selected community");
        }}
      />

      <div className="w-[100%] flex flex-col gap-4 md:w-[80%] lg:w-[70%]">
        {posts.map((post) => (
          <div key={post.id}>
            <BlogPost post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
