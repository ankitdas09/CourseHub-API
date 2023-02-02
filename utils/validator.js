import logger from "../utils/logger.js";
import AppError from "./appError.js";

const validate = (validator) => {
	return (req, res, next) => {
		const { error } = validator(req.body);
		if (error) {
			logger.error(error);
			throw new AppError(500, "Validation Error");
		}
		next();
	};
};
export default validate;
