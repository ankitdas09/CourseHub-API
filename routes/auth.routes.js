import express, { json } from "express";
const router = express.Router();
const scope = "User.read offline_acess Mail.read";
import catchAsync from "../utils/catchAsync.js";
import {
    redirectHandler,
    loginHandler,
    logoutHandler,
    mobileCodeHandler,
} from "../controllers/auth.controller.js";

//not used
router.get("/login", loginHandler);

router.get("/login/redirect/", catchAsync(redirectHandler));
router.post("/mobile", catchAsync(mobileCodeHandler));

router.get("/logout", logoutHandler);

export default router;
