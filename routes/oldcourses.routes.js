import express from "express";
import catchAsync from "../utils/catchAsync.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
	getCourseById,
	getCourses,
	getFolderById,
} from "../controllers/course.controller.js";

const router = express.Router();

router.get("/loadcourses", isAuthenticated, catchAsync(getCourses));
router.get("/course/:id", isAuthenticated, catchAsync(getCourseById));
router.get("/folder/:id", isAuthenticated, catchAsync(getFolderById));

export default router;
