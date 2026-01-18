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
let otpCollection;
let paymentCollection;

export const connectDB = async () => {
  try {
    await client.connect();

    db = client.db("User_Management_System");
    userCollection = db.collection("users");
    otpCollection = db.collection("otp");
    paymentCollection = db.collection("payments");

    // ✅ OTP indexes create AFTER connection
    await setupOtpCollection();

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};

export const getDB = () => db;
export const getUserCollection = () => userCollection;
export const getOtpCollection = () => otpCollection;
export const getPaymentCollection = () => paymentCollection;

/**
 * OTP Index Setup (TTL)
 */
const setupOtpCollection = async () => {
  try {
    // TTL Index (auto delete after expiresAt)
    await otpCollection.createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0 }
    );

    // Email index
    await otpCollection.createIndex({ email: 1 });

    console.log("OTP collection indexes created");
  } catch (error) {
    console.error("OTP index setup error:", error);
  }
};
