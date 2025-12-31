import { getUserCollection } from "../config/db.js";
import { createUser } from "../models/users.schema.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";


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
            image: imageData
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

        let image = null;

        if (req.file) {
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