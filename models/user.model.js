import { model, Schema } from "mongoose";
import Joi from "joi";
import axios from "axios";
import jwt from "jsonwebtoken";
import config from "../config/default.js";

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollNumber: { type: Number, required: true, unique: true },
    // branch: { type: String, required: true },
    semester: { type: Number, reqiured: true },
    degree: { type: String, required: true },
    courses: { type: Array, default: [], required: true },
    // contri
    department: { type: String, required: true }, //dup
    favourites: [
        {
            name: { type: String },
            id: { type: String },
            path: { type: String },
            code: { type: String },
        },
    ],
});

userSchema.methods.generateJWT = function () {
    var user = this;
    var token = jwt.sign({ user: user._id }, config.jwtSecret, {
        expiresIn: "1h",
    });
    return token;
};

userSchema.statics.findByJWT = async function (token) {
    try {
        var user = this;
        var decoded = jwt.verify(token, config.jwtSecret);
        const id = decoded.user;
        const fetchedUser = user.findOne({ _id: id });
        if (!fetchedUser) return false;
        return fetchedUser;
    } catch (error) {
        return false;
    }
};

const User = model("User", userSchema);
export default User;

export const validateUser = function (obj) {
    const joiSchema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        rollNumber: Joi.number().required(),
        // branch: Joi.string().required(),
        semester: Joi.number().required(),
        degree: Joi.string().required(),
        courses: Joi.array().required(),
        department: Joi.string().required(),
    });
    return joiSchema.validate(obj);
};

export const getUserFromToken = async function (access_token) {
    try {
        var config = {
            method: "get",
            url: "https://graph.microsoft.com/v1.0/me",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        const response = await axios.get(config.url, {
            headers: config.headers,
        });

        return response;
    } catch (error) {
        return false;
    }
};

// export const findUserWithRollNumber = async function (rollNumber) {
// 	const user = await User.findOne({ rollNumber: rollNumber });
// 	if (!user) return false;
// 	return user;
// };

export const findUserWithEmail = async function (email) {
    const user = await User.findOne({ email: email });
    // console.log("found user with email", user);
    if (!user) return false;
    return user;
};

export const addToFavourites = async (userid, name, id, path, code) => {
    const UserData = await User.findById(userid);
    const favs = UserData.favourites;
    const found = favs.find((item) => item.id === id);
    if (found) return UserData;
    UserData.favourites.push({
        name: name,
        id: id,
        path: path,
        code: code,
    });
    const updatedUser = await UserData.save();
    return updatedUser;
};

export const removeFromFavourites = async (userid, fileid) => {
    const resp = await User.findOneAndUpdate(
        { _id: userid },
        { $pull: { favourites: { _id: fileid } } },
        { new: true }
    );
    return resp;
};
