import { Router } from "express";
import { signup,verifyOTP } from "../controllers/userControllers.js";

const router=Router()
router.post("/signup",signup)
router.post("/signup-verifyOTP",verifyOTP)

export default router