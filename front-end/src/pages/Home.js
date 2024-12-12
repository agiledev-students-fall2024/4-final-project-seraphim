import React, { useState, useEffect, useContext } from "react";
import HomePost from "../components/HomePost";
import DropdownMenu from "../components/DropdownMenu";
import SearchBar from "../components/SearchBar";
import { ColorContext } from "../ColorContext";
import { FontContext } from "../FontContext";
import { axiosInstance } from "../axios";

const Home = () => {
  const { updateColor } = useContext(ColorContext);
  const { updateFont } = useContext(FontContext);

  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");

  useEffect(() => {
    // Fetch user's communities
    axiosInstance
      .get(`/user-communities`)
      .then((response) => {
        setCommunities(response.data.communities);
      })
      .catch((err) => {
        console.log("Failed to fetch user's communities.");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Fetch posts
    const params = {};
    if (selectedCommunity) {
      params.communityId = selectedCommunity;
    }

    axiosInstance
      .get(`/home`, { params })
      .then((response) => {
        const initialPosts = response.data.posts;
        setPosts(initialPosts);
      })
      .catch((err) => {
        console.log("Failed to fetch posts.");
        console.error(err);
      });
  }, [selectedCommunity]);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        const contentMatch = post.content
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        const nameMatch = post.madeBy.name
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        const usernameMatch = post.madeBy.username
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        return contentMatch || nameMatch || usernameMatch;
      });
      setFilteredPosts(filtered);
    }
  }, [searchInput, posts]);

  useEffect(() => {
    axiosInstance
      .get(`/color-mode`)
      .then((response) => {
        updateColor(response.data);
      })
      .catch((err) => {
        console.log(`Could not get data.`);
        console.error(err);
      });

    axiosInstance
      .get(`/font-size`)
      .then((response) => {
        updateFont(response.data);
      })
      .catch((err) => {
        console.log(`Could not get data.`);
        console.error(err);
      });
  }, [updateColor, updateFont]);

  // Handle changes in the search input
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle changes in the community dropdown
  const handleCommunityChange = (e) => {
    setSelectedCommunity(e.target.value);
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center gap-6 p-8 mx-auto md:w-[90%]">
      <h1 className="text-xl font-bold text-ebony-700 text-center">Home</h1>
      <SearchBar
        searchInput={searchInput}
        onChange={handleChange}
        handleSearch={() => { }}
      />

      <DropdownMenu
        name="communitySelect"
        label="Select a Community"
        options={communities}
        onChange={handleCommunityChange}
        value={selectedCommunity}
      />

      <div className="w-[100%] flex flex-col gap-4 md:w-[80%] lg:w-[70%]">
        {filteredPosts.map((post) => (
          <div key={post._id}>
            <HomePost
              post={post}
              onDelete={(deletedPostId) => {
                // Update the posts and filteredPosts arrays to remove the deleted post
                setPosts((prevPosts) => prevPosts.filter((p) => p._id !== deletedPostId));
                setFilteredPosts((prevFiltered) => prevFiltered.filter((p) => p._id !== deletedPostId));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

