import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@user-management-system.9ikrzyv.mongodb.net/?appName=User-Management-System`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
let userCollection;

export const connectDB = async() => {
    try{
        await client.connect();
        db = client.db("User_Management_System");
        userCollection = db.collection("users");
        console.log("MongoDb Conneted succesfully");
    }
    catch(err){
        console.error("Db not connected succesfully");
        process.exit(1);
    }
}

export const getDB = () => db;
export const getUserCollection = () => userCollection;