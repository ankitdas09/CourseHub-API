import "dotenv/config";

export default {
	port: process.env.PORT || 8080,
	mongoURI: process.env.MONGO_URI,
	clientURL: process.env.CLIENT_URL,
	jwtSecret: process.env.JWT_SECRET,
};
