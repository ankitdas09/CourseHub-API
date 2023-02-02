import mongoose from "mongoose";
import SearchModel from "../models/search.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const deleteAllCourses = async () => {
    await SearchModel.deleteMany({});
};

await deleteAllCourses();
console.log("DELETED SEARCH RESULTS");

process.exit(0);
