import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import TitleAndDescriptionBox from "../components/TitleAndDescriptionBox";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";
import HomePost from '../components/HomePost';

const Profile = (props) => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState({
        profilePicture: 'default_pic.png',
        signedIn: false,
        communities: [],
        posts: [],   
    });    
    //const [hasFollowed, setHasFollowed] = useState(false); 
    const [onCommunities, setOnCommunities] = useState(true);
    const [onBlogs, setOnBlogs] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const endpoint = userId ? `/profile/${userId}` : "/profile";
                const response = await axiosInstance.get(endpoint);
                if (response.data.redirectTo) {
                    navigate("/profile");
                }
                const newUser = response.data;
                setUser((prevUser) => ({
                    ...prevUser,
                    ...newUser
                }));
            } catch (error) {
                console.error('Error in getting profile data.');
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        };

        fetchProfile();
    }, [userId]); 

    /*
    const handleFollow = () => {
        setUser((prevUser) => ({
            ...prevUser,
            followers: prevUser.followers + (hasFollowed ? -1 : 1)
        }));
        setHasFollowed(!hasFollowed); 
    };
    */

    const toggleCommunities = () => {
        setOnCommunities(true);
        setOnBlogs(false);
    };

    const toggleBlogs = () => {
        setOnCommunities(false);
        setOnBlogs(true);
    };

    return (
        <div className="w-[100%] lg:w-[90%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
            <h1 className="text-xl font-bold text-ebony-700 text-center">Profile</h1>
            <ProfileHeader 
                user={user}
                loggedIn={user.signedIn} 
                //onFollow={handleFollow} 
                //hasFollowed={hasFollowed} 
                toggleBlogs={toggleBlogs}
                toggleCommunities={toggleCommunities}
            />
            {onCommunities && (
                <section className="flex flex-col justify-center w-[100%] sm:w-[95%] gap-0">
                    {user.communities.length > 0 ? (
                        user.communities.slice().reverse().map(item => (
                            <div key={item.id}>
                                <TitleAndDescriptionBox
                                    link={`/community/${item.id}`}
                                    title={item.name}
                                    description={item.description}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="m-auto bg-lavender_blush-900 w-[90%] md:w-[70%] p-8 rounded-lg text-center text-sm md:text-lg text-ebony font-semibold shadow-md shadow-[#fedae7]">
                            Find your place and join a community today <Link to="/community" className="text-rose text-bold hover:underline hover:text-rose">here</Link>
                            <hr className="border-none"></hr>
                            You can also form your own community <Link to="/create-community" className="text-rose text-bold hover:underline hover:text-rose">here</Link>
                        </div>
                    )}
                </section>
            )}
            {onBlogs && (
                <section className="flex flex-col justify-center w-[85%] gap-2">
                    {user.posts.length > 0 ? (
                        user.posts.slice().reverse().map(post => (
                        <div key={post._id}>
                            <HomePost post={post} />
                        </div>
                        ))
                    ) : (
                        <div className="m-auto bg-lavender_blush-900 w-[90%] md:w-[70%] p-8 rounded-lg text-center text-sm md:text-lg text-ebony font-semibold shadow-md shadow-[#fedae7]">
                            No posts yet! Post and connect with others <Link to="/post" className="text-rose text-bold hover:underline hover:text-rose">here</Link>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default Profile;