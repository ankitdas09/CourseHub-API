import AppError from "../utils/appError.js";
import cheerio from "cheerio";
import axios from "axios";
import qs from "querystring";
import CourseModel, { FileModel, FolderModel } from "../models/course.model.js";

export const getCourses = async (req, res) => {
	var config = {
		method: "post",
		url: "https://academic.iitg.ac.in/sso/gen/student2.jsp",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
			Host: "academic.iitg.ac.in",
			"Content-Length": "13",
		},
		data: qs.stringify({
			rno: req.user.rollNumber,
		}),
	};
	const response = await axios.post(config.url, config.data, {
		headers: config.headers,
	});

	if (!response.data) throw new AppError(500, "Something went wrong");

	const $ = cheerio.load(response.data);

	const courses = [];

	$("tbody")
		.first()
		.find("tr")
		.each((i, tr) => {
			const details = $(tr).children("td");
			var code = $(details[0]).text().trim().replace(" ", "");
			const name = $(details[1]).text().trim();
			const year = $(details[6]).text().trim();
			const session = $(details[7]).text().trim();

			if (
				year === "2022" &&
				session.includes("July") &&
				code.length >= 5 &&
				code.length <= 6 &&
				!code.includes("SA")
			) {
				var code = code.substring(0, 5);
				courses.push({
					code,
					name,
				});
			}
		});

	// console.log(courses);

	res.status(200).json({
		status: "success",
		courses: courses,
	});
};

export const getCourseById = async (req, res, next) => {
	const { id } = req.params;
	const cs = await CourseModel.findOne({ name: id }).populate("");
	res.status(200).json(cs);
};

export const getFolderById = async (req, res, next) => {
	const cs = await FolderModel.findById(req.params.id).populate("data");
	res.status(200).json(cs);
};
