import { Router } from "express";
import {
    signup,
    verifyOTP,
    login,
    verifyOTP_login,
    password_updata,
    password_OTP_verify,
    new_password,
    cheng_password
} from "../controllers/userControllers.js";
import {
     signupAuth, 
     loginAuth, 
     otpAuth ,
     passwordOTPAuth,
     newPasswordAuth,
     chengPasswordAuth,
    } from "../middleware/userAuth.js";
const router = Router()
router.post("/signup", signupAuth, signup)
router.post("/login", loginAuth, login)
router.post("/signup-verifyOTP", otpAuth, verifyOTP)
router.post("/login-verifyOTP", otpAuth, verifyOTP_login)
router.post("/password-getOTP", passwordOTPAuth, password_updata)
router.post("/password-verifyOTP", otpAuth,password_OTP_verify)
router.post("/new-password-updata", newPasswordAuth,new_password)
router.post("/cheng-password-updata", chengPasswordAuth,cheng_password)

export default router