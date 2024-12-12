import "./App.css";
import ConditionalNavBar from "./components/ConditionalNavBar";
import Home from "./pages/Home";
import Community from "./pages/Community";
import SubCommunityPage from "./pages/SubCommunityPage";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AccountSettings from "./pages/AccountSettings";
import Privacy from "./pages/Privacy";
import Blocked from "./pages/Blocked";
import Accessibility from "./pages/Accessibility";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Post from "./pages/Post";
import VerifyEmail from "./pages/VerifyEmail";
import LandingPage from "./pages/LandingPage";
import EditProfile from "./pages/EditProfile";
import CreateCommunity from "./pages/CreateCommunity";
import { Toaster } from "react-hot-toast";
import { ColorProvider, ColorContext } from './ColorContext';
import { useContext } from "react";
import { FontContext, FontProvider } from "./FontContext";

function AppContent() {
  const noNavRoutes = [
    "/",
    "/login",
    "/signup",
    "/forgotpassword",
    "/resetpassword",
    "/verifyemail",
    //"/landing",
  ];

  const { color } = useContext(ColorContext);
  const { font } = useContext(FontContext);

  return (
    <Router>
      <div className={color.toLowerCase() + " flex h-screen"}>
        <ConditionalNavBar noNavRoutes={noNavRoutes} />

        <div className={"dark:bg-lavender_blush-1000 flex-1 p-4 z-0 overflow-y-auto h-screen px-" + font}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-community" element={<CreateCommunity />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/community/:communityId"
              element={<SubCommunityPage />}
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/account-settings"
              element={<AccountSettings text={"Account Settings"} />}
            />
            <Route
              path="/accessibility"
              element={<Accessibility text={"Accessibility"} />}
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route
              path="/blocked-users"
              element={
                <Blocked type={"blocked_users"} text={"Blocked Users"} />
              }
            />
            <Route
              path="/blocked-communities"
              element={
                <Blocked
                  type={"blocked_communities"}
                  text={"Blocked Communities"}
                />
              }
            />
            <Route
              path="/muted-words"
              element={<Blocked type={"muted_words"} text={"Muted Words"} />}
            />
            <Route path="/post" element={<Post />} />
            <Route
              path="/profile/:userId"
              element={<Profile />}
            />
          </Routes>
          <Toaster />
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ColorProvider>
      <FontProvider>
        <AppContent />
      </FontProvider>
    </ColorProvider>
  );
}

export default App;
