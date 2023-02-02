import User from "../models/user.model.js";
import { addToFavourites, removeFromFavourites } from "../models/user.model.js";

export const getUser = async (req, res, next) => {
    return res.json(req.user);
};

//not used
export const createUser = async (req, res) => {
    const data = req.body;
    const user = new User(data);
    const savedUser = await user.save();
    res.json(savedUser);
};

export const addToFavouriteController = async (req, res, next) => {
    const data = req.body;
    if (!data.id || !data.name || !data.path || !data.code) return res.sendStatus(400);
    //validate
    const updatedUser = await addToFavourites(
        req.user._id,
        data.name,
        data.id,
        data.path,
        data.code
    );
    return res.status(200).json(updatedUser);
};

export const removeFromFavouritesController = async (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.sendStatus(400);
    //validate
    const updatedUser = await removeFromFavourites(req.user._id, id);
    return res.status(200).json(updatedUser);
};
