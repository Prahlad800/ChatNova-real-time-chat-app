import { Router } from "express";
import { signup,verifyOTP,login,verifyOTP_login } from "../controllers/userControllers.js";
import { signupAuth,loginAuth,otpAuth } from "../middleware/userAuth.js";
const router=Router()
router.post("/signup",signupAuth,signup)
router.post("/login",loginAuth,login)
router.post("/signup-verifyOTP",otpAuth, verifyOTP)
router.post("/login-verifyOTP",otpAuth, verifyOTP_login)

export default router