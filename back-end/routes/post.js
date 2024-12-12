import express from "express";
import { protectRouter } from "../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";
import Post from "../models/post.model.js";
import Community from "../models/community.model.js";
import User from "../models/user.model.js"; // Import User model if needed

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/posts");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    );
    const newName = `${basenameWithoutExtension}-${Date.now()}${Math.random()}${extension}`;
    cb(null, newName);
  },
});

const upload = multer({ storage });

router.post(
  "/api/post",
  protectRouter,
  upload.single("file"),
  async (req, res) => {
    try {
      const { content, community } = req.body;
      const userId = req.user._id;

      if (!content || !community) {
        return res.status(400).json({
          error: "Missing required fields: content and community",
          status: "Failed to handle post submission",
        });
      }

      const communityExists = await Community.findById(community);
      if (!communityExists) {
        return res.status(404).json({ error: "Community not found" });
      }

      const imagePath = req.file ? `/uploads/posts/${req.file.filename}` : null;

      const newPost = new Post({
        madeBy: userId,
        community: community,
        content: content,
        images: imagePath ? [imagePath] : [],
        likedBy: [],
        replies: [],
      });

      await newPost.save();

      // Add the post to the user's posts array
      await User.findByIdAndUpdate(
        userId,
        { $push: { posts: newPost._id } },
        { new: true }
      );

      res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message,
        status: "Failed to handle post submission.",
      });
    }
  }
);

// Route to like a post
router.post("/api/posts/:id/like", protectRouter, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!post.likedBy.includes(userId)) {
      post.likedBy.push(userId);
      await post.save();
    }

    res.status(200).json({ message: "Post liked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like post" });
  }
});

// Route to unlike a post
router.post("/api/posts/:id/unlike", protectRouter, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likedBy = post.likedBy.filter(
      (id) => id.toString() !== userId.toString()
    );
    await post.save();

    res.status(200).json({ message: "Post unliked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unlike post" });
  }
});

// Route to add a reply to a post
router.post("/api/posts/:id/reply", protectRouter, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Fetch the original post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Create the reply post
    const reply = new Post({
      madeBy: userId,
      content,
      likedBy: [],
      replies: [],
      community: post.community, // Assign the same community as the original post
    });

    await reply.save();

    // Add the reply to the original post
    post.replies.push(reply._id);
    await post.save();

    // Populate the madeBy field for the reply
    await reply.populate("madeBy", "username name profilePicture");

    res.status(201).json({ message: "Reply added", reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add reply" });
  }
});

// Route to delete a post
router.delete("/api/posts/:id", protectRouter, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the logged-in user is the author of the post
    if (!post.madeBy.equals(userId)) {
      return res.status(403).json({ error: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    // Also remove the post from the user's posts array, if necessary
    await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: postId } },
      { new: true }
    );

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});


export default router;





