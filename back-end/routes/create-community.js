import multer from "multer";
import express from "express";
import path from "path";
import { protectRouter } from "../middlewares/auth.middleware.js";
import Community from "../models/community.model.js";
import User from "../models/user.model.js";
import { body, validationResult } from "express-validator";

//handles creaing a new community and uploading a picture 
const router = express.Router();

// enable file uploads saved to disk in a directory named 'public/uploads/community'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/community");
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    );

    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${Math.random()}${extension}`;
    // tell multer to use this new filename for the uploaded file
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

//route for HTTP POST requests for /api/create-community (includes file upload)
router.post("/api/create-community", protectRouter, upload.single("file"), 
[
  body("name")
    .trim()
    .notEmpty().withMessage("Name needs to be provided")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long")
    .isLength({ max: 100}).withMessage("Name cannot exceed 100 characters long")
    .custom((value) => {
      if (/^\s|\s$/.test(value)){
        throw new Error("Name should not have any leading and trailing whitespace")
      }
      return true
    }),
  
  body("description")
    .trim()
    .notEmpty().withMessage("Description should be provided")
    .isLength({ min: 5 }).withMessage("Description must be at least 5 characters long")
    .isLength({ max: 500}).withMessage("Description cannot exceed 500 characters")
    .custom((value) => {
      if (/^\s|\s$/.test(value)){
        throw new Error("Description should not have any leading and trailing whitespace")
      }
      return true
    }),

  body("file")
    .custom((value, {req}) => {
      if (!req.file){
        throw new Error("A file must be uploaded")
      }
      return true
    })
    .withMessage("File upload failed")
    
],

async (req, res) => {
  try{
    //data validation
    const errors = validationResult(req)
    
    if (!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array()
      })
    }

    //gets all the info needed to create a new community 
    const {name, description}  = req.body
    const communityPicture = req.file ? `/uploads/community/${req.file.filename}` : undefined
    const creator = req.user._id

    console.log(name, description, communityPicture, creator)

    //validates the provided info 
    if (!name || !description || !communityPicture){
      return res.status(500).json({
          message: "missing name, description, or file field on form"
      })
    }

    if (!creator){
      return res.status(500).json({
        message: "unauthenticated user"
    })
    }
    
    //makes sure that community doesn't already exist 
    const foundCommunity = await Community.findOne({name})
    if (foundCommunity){
      return res.status(400).json({
        message: "community can not be created: name is already taken"
      })
    }

    //creates new community and saves it in database
    const newCommunity = new Community({
      name, 
      description,
      communityPicture,
      creator,
      members: [creator]
    })
    await newCommunity.save()

    //add community to user's list of communities 
    const user = await User.findById(creator)
    user.communities.push(newCommunity._id)
    await user.save()

    //send back community data after it works
    const data = {
      status: "community created successfully",
      name: name,
      description: description,
      communityPicture: communityPicture,
    };

    res.status(200).json(data)

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err,
      status: "failed to create a new community"
    })
  }
    
})

export default router;