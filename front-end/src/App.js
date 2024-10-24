import logo from "./logo.svg";
import "./App.css";
import TitleAndDescription from "./components/TitleAndDescription";
import TextAndButton from "./components/TextAndButton";
import UploadImage from "./components/UploadImage";
import DropdownMenu from "./components/DropdownMenu";
import TitleAndDescriptionBox from "./components/TitleAndDescriptionBox";
import NavigationBar from "./components/NavigationBar";
import SubCommunity from "./components/SubCommunity";
import CommunityPopup from "./components/CommunityPopup";
import InputField from "./components/InputField";
import SubmitButton from "./components/SubmitButton";
import LogoPageTitle from "./components/LogoPageTitle";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import BlogPost from "./components/BlogPost";
import About from "./components/About";
import ProfileHeader from "./components/ProfileHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App m-[auto] font-sera">
        <Router>
          <main className="App-main">
            <Routes>
              {/* a route for the home page */}
              <Route path="/" element={<Home />} />

              {/* a route to the community page */}
              <Route path="/community" element={<Community />} />

              {/* a route for blog page */}
              <Route path="/blog" element={<Blog />} />

              {/* a route for profile page */}
              <Route path="/profile" element={<Profile />} />
            </Routes>

            {/* test components */}
            <TitleAndDescription
              title={"Account Settings"}
              description={
                "See information about your account and learn about your deactivation settings."
              }
            />

            <h1></h1>

            <TextAndButton text={"blocked_account"} button={"Unblock"} />

            <h1></h1>

            <UploadImage image={"Profile icon"} />

            <h1></h1>

            <DropdownMenu
              name={"color-mode"}
              label={"Color Mode"}
              options={["Light", "Dark"]}
            />

            <h1></h1>

            <TitleAndDescriptionBox
              title={"Privacy"}
              description={
                "Limit access to your account and information from others in communities."
              }
            />

            <h1></h1>

            <SubCommunity
              image={"/logo192.png"}
              name={"React"}
              description={
                "React.js is a front-end Javascript library that creates HTML, CSS, and browser-based Javascript, going from intepreting non-compatible Javascript from JSX syntax to browser-compatible Javascript."
              }
            />

            <h1></h1>

            <CommunityPopup />

            <h1></h1>

            <BlogPost
              User={{
                profilePic: "/seraphim-logo.png", 
                name: "Mona Lisa",
                userName: "@monalisa",
                text: "This is a sample blog post text for testing purposes. Just saw myself at the Louvre. #Dope",
                images: [
                    "/logo192.png", 
                    "/logo192.png", 
                ]
              }}
            />

            <About
              User={{
                name: "Mona Lisa",
                aboutMe: "This is a sample about me."
              }}
            />

            <ProfileHeader
                User={{
                  profilePic: "/seraphim-logo.png", 
                  name: "Mona Lisa",
                  userName: "@monalisa",
                  about: ['She/Her', '12/01/2003', 'Louvre Museum, Paris'],
                  aboutPage: '/about/monalisa',
                  communitiesPage: '/communities/monalisa',
                  blogsPage: '/blogs/monalisa'
                }}
                LoggedIn={true}
            />

            <NavigationBar />

            <LogoPageTitle
              logoSrc="logo192.png"
              title="example logo and page title"
            />
            <InputField inputfieldName="Name" />
            <InputField inputfieldName="Email" inputType="email" />
            <InputField inputfieldName="Password" inputType="password" />
            <SubmitButton placeholder="Submit" />
            <SearchBar />
          </main>
        </Router>
      </div>
    </>
  );
}

export default App;
