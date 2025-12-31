import cloudinary from "../config/cloudinary.js";

export const deleteImageController = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "public_id required",
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      result,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Image delete failed",
      err: err.message,
    });
  }
};
