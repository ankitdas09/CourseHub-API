import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const deleteAllUsers = async () => {
    await UserModel.deleteMany({});
};

await deleteAllUsers();
console.log("DELETED ALL USERS");

process.exit(0);
