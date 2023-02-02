import mongoose from "mongoose";
import CourseModel from "../models/course.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const deleteAllCourses = async () => {
	await CourseModel.deleteMany({});
};

await deleteAllCourses();
console.log("DELETED ALL COURSES");

process.exit(0);
