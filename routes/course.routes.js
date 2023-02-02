import express from "express";
import {
	deleteCourseByCode,
	getAllCourses,
	getCourse,
} from "../controllers/course.controller.js";
const router = express.Router();

import catchAsync from "../utils/catchAsync.js";

router.get("/", catchAsync(getAllCourses));
router.get("/:code", catchAsync(getCourse));
router.get("/delete/:code", catchAsync(deleteCourseByCode));

export default router;
