import { connect } from "mongoose";
import config from "../config/default.js";
import logger from "../utils/logger.js";

const connectDatabase = () => {
	connect(config.mongoURI)
		.then(() => logger.info("DB Connected"))
		.catch((e) => logger.error(e.message));
};

export default connectDatabase;
