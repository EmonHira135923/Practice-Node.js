import { getUserCollection } from "../config/db.js";



export const validateUser = async(req,res,next) => {
    const {name,email,password,phone} = req.body;

    if(!name && !email && !password && !phone){
        return res.status(400).json({
        message: "All Fields are required",
        success:false
    })
    }

    if(!name) return res.status(400).json({
        message: "Name Fields are required",
        success:false
    })
    if(!email) return res.status(400).json({
        message: "email Fields are required",
        success:false
    })
    if(!password) return res.status(400).json({
        message: "Password Fields are required",
        success:false
    })
    if(!phone) return res.status(400).json({
        message: "Phone Fields are required",
        success:false
    })
    next();
}

export const checkUniqueUser = async(req,res,next) => {
    const {name,email} = req.body;
    const userCollection = getUserCollection();
    const exitsemail = await userCollection.findOne({email});
    if(exitsemail){
        return res.status(400).json({
            message:"Email Already Exits",
            success:false
        })
    }
    const exitsname = await userCollection.findOne({name});
    if(exitsname){
        return res.status(400).json({
            messaage:"Name Already Exits",
            success:false
        })
    }

    next();
}