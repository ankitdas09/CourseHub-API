import mongoose from "mongoose";
import { FileModel } from "../models/course.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const deleteAllFiles = async () => {
	await FileModel.deleteMany({});
};

await deleteAllFiles();
console.log("DELETED ALL FILES");

process.exit(0);
