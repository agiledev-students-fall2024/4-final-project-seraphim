// this is a route for authentication
import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// hardcode data: waiting to be deleted
export let user = {
  id: 1,
  display_name: "",
  username: "",
  about: "This user hasn’t added a bio yet...",
  posts: [],
  communities: [],
  profile_pic: "default_pic.png",
  signedIn: true,
  followers: [],
  following: [],
};

export const signup = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (!name || !username || !password || !email) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    //todo: implement mailTrap api
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("jwt-seraphim", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log("Error in signup baaaaackend", error.message);
    console.error("Error in signup", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create a cookie
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("jwt-seraphim", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(200)
      .json({ message: "Logged in successfully", username, password });
  } catch (error) {
    console.error("Error in login", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt-vocationsphere");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in getCurrentUser", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.post("/api/signup", signup);
router.post("/api/login", login);
router.post("/api/logout", logout);

export default router;
