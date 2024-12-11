import React, { useState, useEffect } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { axiosInstance } from "../axios";
import { Link } from "react-router-dom";

const HomePost = ({ post, isReply = false, onDelete }) => { /*const HomePost = ({ post, isReply = false }) => { this old line updated this line to delete post*/
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(post.replies || []);
  const [postState, setPostState] = useState(post);
  const [postUser, setPostUser] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/profile`)
      .then((response) => {
        setUser(response.data);
        if (response.data && post.likedBy.includes(response.data._id)) {
          setLiked(true);
        }
      })
      .catch((err) => {
        console.log(`Error fetching user data.`);
        console.error(err);
      });
  }, [post.likedBy]);

  useEffect(() => {
    // Update postUser whenever postState changes
    if (postState && postState.madeBy) {
      setPostUser(postState.madeBy);
    }
    // console.log(postUser)
  }, [postState]);

  const toggleLike = () => {
    if (!user) return;

    if (liked) {
      axiosInstance
        .post(`/posts/${post._id}/unlike`)
        .then(() => {
          setLiked(false);
          setPostState((prevPost) => ({
            ...prevPost,
            likedBy: prevPost.likedBy.filter((userId) => userId !== user._id),
          }));
        })
        .catch((err) => {
          console.error("Failed to unlike post:", err);
        });
    } else {
      axiosInstance
        .post(`/posts/${post._id}/like`)
        .then(() => {
          setLiked(true);
          setPostState((prevPost) => ({
            ...prevPost,
            likedBy: [...prevPost.likedBy, user._id],
          }));
        })
        .catch((err) => {
          console.error("Failed to like post:", err);
        });
    }
  };

  const handleReplySubmit = () => {
    if (newReply.trim()) {
      axiosInstance
        .post(`/posts/${post._id}/reply`, { content: newReply })
        .then((response) => {
          setReplies([...replies, response.data.reply]);
          setNewReply("");
        })
        .catch((err) => {
          console.error("Failed to submit reply:", err);
        });
    }
  };

  const handleReplyCancel = () => {
    setShowReplies(false);
  };

  const formatLikes = (likes) => {
    return likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes;
  };

  // Extract necessary data from postUser
  /*
  const profilePic = postUser?.profilePicture || "/default_pic.png";
  const displayName = postUser?.name || "Anonymous";
  const username = postUser?.username || "unknown";
  const communityName = postState.community?.name || "General";
  */

  useEffect(() => {
    axiosInstance.get(`/font-size`)
      .then(response => {
        setSize(response.data)
      })
      .catch(err => {
        console.log(`Could not get data.`)
        console.error(err)
      })
  }, [])

  // Determine if the logged-in user is the author of the post
  const isAuthor = user && postUser && user._id === postUser._id;

  const handleDelete = () => {
    // Use postState._id to ensure we using the current, correct ID
    axiosInstance.delete(`/posts/${postState._id}`)
      .then((response) => {
        console.log("Post deleted:", response.data.message);
        if (typeof onDelete === "function") {
          onDelete(postState._id);
        }
      })
      .catch((err) => {
        console.error("Failed to delete post:", err);
      });
  };

  return (
    <div
      className={`w-[100%] md:w-[95%] px-4 py-2 bg-lavender_blush-900 rounded-lg ${isReply
        ? "rounded-none border-[1px] border-b-0 border-ebony-900"
        : "shadow-md shadow-ebony-900"
        } ${isReply ? "m-0" : "m-auto"} `}
    >
      {postUser && (
        <Link to={`/profile/${postUser._id}`}>
          <div className="flex flex-row items-center">
            <img
              src={postUser.profilePicture}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-lg my-4 mx-2"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.src = '/default_pic.png';
              }}
            />
            <div className="flex flex-col justify-start items-start text-md my-4 ml-2">
              <span className="font-bold text-ebony text-left">
                {postUser.name}
              </span>
              <div>
                <span className="text-rose opacity-[75%]">@{postUser.username}</span>
                {!isReply && (
                  <span className="text-ebony opacity-[75%]">
                    {" "}
                    in {postState.community.name || "General"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className={"w-[95%] m-auto text-ebony px-" + size}>
        {postState.content}
      </div>
      {
        postState.images && postState.images.length === 1 ? (
          <img
            src={`${process.env.REACT_APP_SERVER_HOSTNAME}${postState.images[0]}`}
            alt="Blog Post"
            className="w-[95%] h-auto rounded-md m-auto mt-3 bg-ebony-800"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 w-[95%] m-auto mt-3">
            {postState.images &&
              postState.images.map((image, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_SERVER_HOSTNAME}${image}`}
                  alt={`Blog Post ${index + 1}`}
                  className="w-full h-48 rounded-md object-cover bg-ebony-800"
                />
              ))}
          </div>
        )
      }

      <div className="w-[95%] flex flex-row justify-end items-center gap-8">
        <button
          onClick={toggleLike}
          className="mt-4 flex flex-row items-center gap-2 text-rose"
        >
          {liked ? (
            <FcLike
              size="32"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(99%) sepia(60%) saturate(6174%) hue-rotate(284deg) brightness(101%) contrast(102%)",
              }}
            />
          ) : (
            <FcLikePlaceholder
              size="32"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(96%) sepia(51%) saturate(944%) hue-rotate(284deg) brightness(105%) contrast(104%)",
              }}
            />
          )}
          <div>
            <span className="font-bold text-lg">
              {formatLikes(postState.likedBy.length)}
            </span>{" "}
            Hearts
          </div>
        </button>
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="mt-4 text-ebony"
        >
          <span className="font-bold text-lg">{replies.length}</span> Replies
        </button>
      </div>

      {/* Delete Post Button: Only shown if user is the author */}
      {isAuthor && (
        <button
          onClick={handleDelete}
          className="mt-4 bg-transparent text-rose border-[1px] border-rose py-1 px-4 rounded-md hover:bg-rose hover:text-lavender_blush-900"
        >
          Delete Post
        </button>
      )}

      {
        showReplies && (
          <div className="mt-4">
            <input
              type="text"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write a reply..."
              className="border-[1px] border-rose p-2 w-full rounded-md bg-transparent placeholder-ebony-700 text-ebony"
            />
            <div className="flex flex-row gap-2">
              <button
                onClick={handleReplySubmit}
                className="mt-2 bg-rose text-lavender_blush-900 py-1 px-4 rounded-md hover:bg-ebony"
              >
                Post Reply
              </button>
              <button
                onClick={handleReplyCancel}
                className="mt-2 bg-transparent text-ebony border-[1px] border-ebony py-1 px-4 rounded-md hover:text-rose hover:border-rose"
              >
                Cancel
              </button>
            </div>
            {replies.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold text-ebony mb-2">Replies</h3>
                {replies.map((reply) => (
                <div key={reply._id} className="flex justify-center">
                  <HomePost
                    post={reply}
                    isReply={true}
                    onDelete={(deletedReplyId) => {
                      // Update the replies state to remove the deleted reply
                      setReplies((prevReplies) => prevReplies.filter((r) => r._id !== deletedReplyId));
                    }}
                  />
                </div>
              ))}
              </div>
            )}
          </div>
        )
      }
    </div >
  );
};

export default HomePost;

