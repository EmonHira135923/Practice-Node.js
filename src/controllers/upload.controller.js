import cloudinary from "../config/cloudinary.js";

export const uploadImageController = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path,{
        folder:"uploader"
    });
    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      err: err.message
    });
  }
};
