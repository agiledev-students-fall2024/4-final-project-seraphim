import { useEffect, useState } from "react";
import CommunityPopup from "./CommunityPopup";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoNavigateCircleOutline } from "react-icons/io5";
import BackButton from "./BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../axios";

const SubCommunity = (props) => {
  //join and visit button
  const [isJoinedBefore, setIsJoinedBefore] = useState(false);
  const [isOpen, setStatus] = useState(false);
  const [isVisitButton, setIsVisitButton] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [toLeave, setToLeave] = useState(false);
  const { communityId } = useParams();

  useEffect(() => {
    // Check if the user has already joined the community
    axiosInstance
      .get(`/check-community-membership/${communityId}`)
      .then((response) => {
        if (response.data.isMember) {
          setIsJoinedBefore(true);
          setToLeave(true);
        }
        console.log(response.data);
        console.log("isJoinedBefore", isJoinedBefore);
      })
      .catch((err) => {
        console.error("Error checking community membership", err);
      });
  }, [isJoinedBefore]);

  const handleJoinButton = () => {
    setStatus(true);
    axiosInstance
      .post(`/join-community/${communityId}`)
      .then((res) => {
        console.log(res.data);
        setIsJoined(true);
        // setIsJoinedBefore(true);
        setToLeave(true);
      })
      .catch((err) => {
        console.log("error in joining community");
        console.error(err);
      });
  };

  const handleLeaveButton = () => {
    setStatus(true);
    axiosInstance
      .post(`/leave-community/${communityId}`)
      .then((res) => {
        console.log(res.data);
        setIsJoined(false);
        setIsJoinedBefore(false);
        setToLeave(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closePopup = () => {
    setStatus(false);
    setIsVisitButton(true);
  };

  //back button functionality
  const back = useNavigate();

  const handleBackButton = () => {
    back(-1);
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center p-6 bg-lavender_blush-900 rounded-lg shadow-md shadow-ebony-900 relative md:w-[90%] lg:w-[80%]">
      <BackButton backButtonHandler={handleBackButton} />
      <div className="flex justify-end w-[100%] mb-6">
        {!isVisitButton ? (
          !toLeave ? (
            <button
              onClick={handleJoinButton}
              className="bg-ebony-700 z-1 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2 w-auto max-w-xs"
            >
              Join <FaPlusCircle />
            </button>
          ) : (
            <button
              onClick={handleLeaveButton}
              className="bg-ebony-700 z-1 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2 w-auto max-w-xs"
            >
              Leave <FaMinusCircle />
            </button>
          )
        ) : (
          <Link to={"/home"}>
            <button className="bg-ebony-700 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2 w-auto max-w-xs">
              Home <IoNavigateCircleOutline className="w-5 h-5" />
            </button>
          </Link>
        )}
      </div>

      {isOpen && isJoined && (
        <CommunityPopup joinedBefore={isJoinedBefore} close={closePopup} />
      )}

      <img
        className="rounded-full w-[35%] ring-[6px] ring-rose-700 mb-10"
        src={props.image}
        alt="group logo"
        onError={(e) => {
          // console.log("Image failed to load:", props.image);
          // try to console.error(e); and under target under e you can find the complete url
          console.log(e.target.src);
          e.target.src = "/default_pic.png";
        }}
      />

      <h2 className="text-lg font-bold text-ebony-600">{props.name}</h2>
      <p className="text-md text-ebony-700 p-4">{props.description}</p>
    </div>
  );
};

export default SubCommunity;
