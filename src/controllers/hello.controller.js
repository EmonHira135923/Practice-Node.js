import { getUserCollection } from "../config/db.js";

export const hellocontroller = async (req, res) => {
  res.send("Hello World!!!");
};

export const helloemon = async (req, res) => {
  res.send("Hello My name is Emon Hossain Hira");
};

export const CreateUser = async(req,res) => {
    try{
        const query = req.body;
        const userCollection = getUserCollection();
        const result = await userCollection.insertOne(query);
        res.status(201).json({
            "message":"User created Succesfully",
            "success":true,
            result
        })
    }
    catch(err){
        res.status(400).json({
            "message":"User Not Created yet",
            "success":false,
            err
        })
    }
}
export const GetUser = async(req,res) => {
    const userCollection = getUserCollection();
    const cursor = userCollection.find({});
    const result = await cursor.toArray();
    res.send(result);
    
}




