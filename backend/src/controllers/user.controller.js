import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body;
    const userId = req.user._id;
    
    if (!profilePic && !fullName) {
      return res.status(400).json({ message: "No data provided to update" });
    }
    
    let updateFields = {};
    
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateFields.profilePic = uploadResponse.secure_url;
    }
    
    if (fullName) {
      updateFields.fullName = fullName;
    }
    
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in checkAuth controller: ", error.message);
    res.status(500).json({message: "Internal Server Error"})
  }
}