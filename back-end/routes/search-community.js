import express from "express"
import Community from "../models/community.model.js";
import Setting from "../models/setting.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";

const router = express.Router();

//community - sends back community group data for searching 
router.get('/api/community', protectRouter, async (req, res) => {
    try {
        //fetch all communities' names and descriptions from database
        const communities = await Community.find({}, "name description").exec()

        //add id attribute and include period for the first sentence of the description
        const completeCommunities = communities.map(community => {
            const firstSentence = community.description.split(".")[0]
            const completeFirstSentence = firstSentence + (community.description.includes(".") ? "." : "")

            return {
                id: community._id.toString(),
                name: community.name,
                description: completeFirstSentence
            }

        })

        // check for blocked communities
        const userId = req.user._id;

        const blockedData = await Setting.findOne({ userId });
        const blockedComms = blockedData.blockedCommunities;

        // if user has blocked users
        if (blockedComms.length > 0) {
            blockedComms.map(comm => {
                completeCommunities.map(post => {
                    // remove post from posts array
                    if (post.id === comm.cid.toString()) {
                        let index = completeCommunities.indexOf(post);
                        completeCommunities.splice(index, 1);
                    }
                });
            });
        };

        res.status(200).json(completeCommunities)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: err,
            status: "failed to get all community data from back-end"
        })
    }
})

export default router