import { Router } from "express";
import { signup,verifyOTP,login,verifyOTP_login,password_updata,password_OTP_verify,new_password } from "../controllers/userControllers.js";
import { signupAuth,loginAuth,otpAuth } from "../middleware/userAuth.js";
const router=Router()
router.post("/signup",signupAuth,signup)
router.post("/login",loginAuth,login)
router.post("/signup-verifyOTP",otpAuth, verifyOTP)
router.post("/login-verifyOTP",otpAuth, verifyOTP_login)
router.post("/password-getOTP",password_updata)
router.post("/password-verifyOTP",password_OTP_verify)
router.post("/new-password-updata",new_password)

export default router