// NavigationBar.js
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiHeartAdd2Line } from "react-icons/ri";
import { GiFluffyWing } from "react-icons/gi";
import { BsEnvelopeHeart } from "react-icons/bs";
import { MdFiberNew } from "react-icons/md";
import { useEffect, useState } from "react";

const NavigationBar = (props) => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setIsSmall(props.small);
  }, []);

  return (
    <nav
      className={`dark:bg-lavender_blush-1001 absolute h-[100vh] md:h-[110vh] lg:relative bg-lavender_blush-900 h-screen p-8 text-xl shadow-md shadow-ebony-900 ${isSmall ? "w-[80%] md:w-[45%] z-20" : "w-1/4"
        }`}
    >
      <div className="text-left font-2xl font-bold mb-4 ml-[-20px] bg-gradient-to-br from-ebony to-rose text-transparent bg-clip-text flex flex-row items-center">
        <img src="/seraphim-logo.PNG" />
        Seraphim
      </div>
      <ul className="flex flex-col space-y-8">
        <li>
          <Link
            to="/home"
            className="flex items-center gap-4 text-rose hover:text-ebony"
          >
            <GiFluffyWing size="28" />
            <span className="mt-2">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/community"
            className="flex items-center gap-4 text-rose hover:text-ebony"
          >
            <BsEnvelopeHeart size="28" />
            <span>Communities</span>
          </Link>
        </li>
        <li>
          <Link
            to="/post"
            className="flex items-center gap-4 text-rose hover:text-ebony"
          >
            <RiHeartAdd2Line size="28" />
            <span>New Post</span>
          </Link>
        </li>
        <li>
          <Link
            to="/create-community"
            className="flex items-center gap-4 text-rose hover:text-ebony"
          >
            <MdFiberNew size="28" />
            <span>Create Community</span>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="flex items-center gap-4 text-rose hover:text-ebony"
          >
            <CgProfile size="28" />
            <span>My Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
