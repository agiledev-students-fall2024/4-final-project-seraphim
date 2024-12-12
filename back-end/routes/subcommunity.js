import express from "express"
import { param, validationResult } from "express-validator";
import Community from "../models/community.model.js";

const router = express.Router();

//subcommunity - sends back a specific community group data after clicking the group
router.get('/api/community/:communityId', 
[
    param("communityId")
     .isMongoId().withMessage("Invalid Community Id")
     .custom(async (value) => {
        const community = await Community.findById(value)

        if (!community){
            throw new Error("Community was not found!")
        }
        return true
     })
],

async (req, res) => {
    try {
        //data validation 
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        //find community from database
        const community = await Community.findById(req.params.communityId)

        //additional validation of the community 
        if (!community){
            return res.status(404)({
                message: "community not found"
            })
        }

        //add data about the community to send back
        const subcommunity = {
            id: community._id.toString(),
            name: community.name,
            description: community.description,
            communityPicture: community.communityPicture || '/uploads/community/default_pic.png'
        }

        res.status(200).json(subcommunity)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: err,
            status: "failed to get subcommunity data from back-end"
        })
    }
})

export default router