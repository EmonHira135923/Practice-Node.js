import { getUserCollection } from "../config/db.js";
import { createUser } from "../models/users.schema.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";


export const CreateUserController = async(req,res) => {
    try{
        const userCollection = getUserCollection();
        const {name,email,password,phone} = req.body;
        const hasedpassword = await bcrypt.hash(password,10);
        let imageData = {
            url: null,
            public_id: null
        };

        // ✅ if image exists
        if (req.file) {
        const imgResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "users"
        });

        imageData = {
            url: imgResult.secure_url,
            public_id: imgResult.public_id
        };
        }
        const userdata = createUser({
            name,
            email,
            password: hasedpassword,
            phone,
            image: imageData,
            roll: "user"
        });
        const query = await userCollection.insertOne(userdata);
        res.status(200).json({
            message: "User Created Succesfully",
            success: true,
            query
        });
        
    }
    catch(err){
        res.status(400).json({
            message:"Invalid data crediantial",
            success: false,
            err
    })
    }
}
export const GetUserController = async(req,res) => {
    try{
        const userCollection = getUserCollection();
        const cursor  = userCollection.find();
        const query = await cursor.toArray();
        res.status(200).send(query);
        
    }
    catch(err){
        res.status(400).json(err)
    }
}
export const GetUserControllerbyId = async(req,res) => {
    try{
    const userCollection = getUserCollection();
    const { email }= req.params;
    const query = {email};
    console.log("q",query)

    const result = await userCollection.findOne(query);

    if(!result){
        res.status(400).json({
        message:"Email Not Found!!!",
        success:false,
        err:err.message
       })

    }

    res.status(200).send(result);
    }
    catch(err){
       res.status(500).json({
        message:"Data Not Found!!!",
        success:false,
        err:err.message
       })

    }
}
export const UpdateUserControllerbyId = async (req, res) => {
    try {
        const userCollection = getUserCollection();
        const {email} = req.params;
        const {phone} = req.body;
        const query = {email};

        const oldUser = await userCollection.findOne(query);

        let image = null;

        if (req.file) {

            if (oldUser?.image?.public_id) {
        await cloudinary.uploader.destroy(oldUser.image.public_id);
      }

        const imgResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "users"
        });

        image = {
            url: imgResult.secure_url,
            public_id: imgResult.public_id
        };
        }

        const updatedata = {
            $set:{
                phone,
                image,
                updatedAt: new Date()
            }
        }

        const option = {};

        const result = await userCollection.updateOne(query,updatedata,option);

        res.status(200).json({
            message: "Updated successfully",
            success: true,
            result
        });

    } catch (err) {
        res.status(500).json({
            message: "Update failed",
            success: false
        });
    }
};
export const DeleteUserController = async(req,res) => {
    try{
    const  userCollection = getUserCollection();
    const {email} = req.params;
    const query = {email};

    // ✅ STEP 1: আগে user খুঁজে বের করি
    const user = await userCollection.findOne(query);

    // ✅ STEP 2: যদি image থাকে → cloudinary থেকে delete
    if (user?.image?.public_id) {
        await cloudinary.uploader.destroy(user.image.public_id);
    }

    const result = await userCollection.deleteOne(query);
    res.status(200).json({
        message:"User Deleted Succesfully",
        success:true,
        result});
    }
    catch(err){
        return res.status(400).json({
            message: "Not deleted data",
            success:false,
            err:err.message
        })
    }

}

export const GetMyProfileController = async (req, res) => {
    try {
        const userCollection = getUserCollection();
        const user = await userCollection.findOne({ _id: new ObjectId(req.user._id) });
        console.log(user)
        if(!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profile", err });
    }
};


// Admin
export const GetAllUsers = async (req, res) => {
  try {
    const userCollection = getUserCollection();
    const users = await userCollection.find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", err });
  }
};

export const DeleteUserByAdmin = async (req, res) => {
  try {
    const userCollection = getUserCollection();
    const { email } = req.params;

    // STEP 1: user খুঁজে বের করা
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // STEP 2: যদি image থাকে → cloudinary থেকে delete
    if (user?.image?.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    // STEP 3: ডাটাবেস থেকে user delete করা
    const result = await userCollection.deleteOne({ email });

    res.status(200).json({ message: "User deleted successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", err });
  }
};

