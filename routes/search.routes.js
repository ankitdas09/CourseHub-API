import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import SearchResult from "../models/search.model.js";
const router = Router();

// router.post(
//     "/",
//     catchAsync(async (req, res, next) => {
//         let { code } = req.body;
//         code = code.toLowerCase();
//         if (!code) return res.sendStatus(400);
//         const fetched = await SearchResult.findOne({ code: code });
//         if (!fetched) return res.status(200).json({ found: false });
//         return res.status(200).json({
//             found: true,
//             id: fetched._id,
//             name: fetched.name,
//             code: fetched.code,
//             isAvailable: fetched.isAvailable,
//         });
//     })
// );

router.post(
    "/",
    catchAsync(async (req, res, next) => {
        let { words } = req.body;

        const agg = await SearchResult.getSearchResults(words);
        const payload = [];
        agg.forEach((item) => {
            if (item.numberOfWordsMatched > 0 || item.codeMatch) payload.push(item);
        });
        return res.status(200).json({ found: payload.length > 0 ? true : false, results: payload });
    })
);

router.post(
    "/feed",
    catchAsync(async (req, res, next) => {
        const { name, code } = req.body;
        const savedDocument = await SearchResult.create({
            name: name.toLowerCase(),
            code: code.toLowerCase(),
        });
        res.json(savedDocument);
    })
);

export default router;
