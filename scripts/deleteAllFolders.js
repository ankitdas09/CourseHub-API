import mongoose from "mongoose";
import { FolderModel } from "../models/course.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const deleteAllFolders = async () => {
	await FolderModel.deleteMany({});
};

await deleteAllFolders();
console.log("DELETED ALL FOLDERS");

process.exit(0);
