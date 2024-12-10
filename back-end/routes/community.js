import express from "express";
import User from "../models/user.model.js";
import Community from "../models/community.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";

const router = express.Router();

const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user._id;

    // find user by id
    const user = await User.findById(userId);
    // find community by id
    const community = await Community.findById(communityId);

    if (
      user.communities.includes(community.communityId) ||
      community.members.includes(userId)
    ) {
      return res.status(400).json({
        message: "You have already joined this community",
      });
    }
    user.communities.push(communityId);
    community.members.push(userId);
    await user.save();
    await community.save();
    // console.log(user.communities, community.members);

    res.status(200).json({
      message: "You successfully joined the community",
      user,
      community,
    });
  } catch (error) {
    console.error("Error in joinCommunity", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkCommunityMembership = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const community = await Community.findById(communityId);
    if (
      user.communities.includes(community.communityId) ||
      community.members.includes(userId)
    ) {
      return res.status(200).json({ isMember: true });
    }
    res.status(200).json({ isMember: false });
  } catch (error) {
    console.error("Error in checkCommunityMembership", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const leaveCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const community = await Community.findById(communityId);

    user.communities = user.communities.filter(
      (id) => id.toString() !== communityId
    );

    community.members = community.members.filter(
      (id) => id.toString() !== userId.toString()
    );

    await user.save();
    await community.save();
    res.status(200).json({
      message: "You successfully left the community",
      user,
      community,
    });
  } catch (error) {
    console.error("Error in leaveCommunity", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.get(
  "/api/check-community-membership/:communityId",
  protectRouter,
  checkCommunityMembership
);
router.post("/api/join-community/:communityId", protectRouter, joinCommunity);
router.post("/api/leave-community/:communityId", protectRouter, leaveCommunity);
export default router;
