import { getUserCollection } from "../config/db.js";
import { createUser } from "../models/users.schema.js";
import bcrypt from "bcrypt";


export const CreateUserController = async(req,res) => {
    try{
        const userCollection = getUserCollection();
        const {name,email,password,phone} = req.body;
        const hasedpassword = await bcrypt.hash(password,10);
        const userdata = createUser({
            name,
            email,
            password: hasedpassword,
            phone,
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
    console.log(email);
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
       res.status(400).json({
        message:"Email Not Found!!!",
        success:false,
        err:err.message
       })

    }
}