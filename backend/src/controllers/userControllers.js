import { User } from "../model/userModel.js";
import { saveOTP, getOTPData, deleteOTP } from "../otp/otpStore.js";
import { sendEmailOTP } from "../otp/mailer.js";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
    try {
        const { name, DOB, email, password, gender } = req.body;
        if (!name, !DOB, !email, !password, !gender) {
            res.status(500)
                .json({
                    message: "all fild requed ",
                    success: false
                })
        }
        const check_uer = await User.findOne({ email })
        if (!check_uer) {
            res.status(500)
                .json({
                    message: "email is already exist,you can login",
                    success: false
                })
        }
        
        const generateOTP = (length = 6) => {
            let otp = "";
            for (let i = 0; i < length; i++) {
                otp += Math.floor(Math.random() * 10);
            }
            return otp;
        };

        const otp = generateOTP(6);

        const hashPassword = await bcrypt.hash(password, 10);

        const dataSave = saveOTP(email, {
            otp,
            name,
            email,
            password: hashPassword,
            DOB,
            gender,

        });

        await sendEmailOTP(email, otp);

        console.log("OTP:", otp);

        res.json({
            success: true,

            message: "OTP sent",
            dataSave
        });




    }
    catch (errer) {
        res.status(201)
            .json({
                message: `signup errer ${errer}`,
                success: false
            })
    }
}
export const verifyOTP= async (req,res)=>{
 try{

 }catch (errer) {
        res.status(201)
            .json({
                message: `signup errer ${errer}`,
                success: false
            })
    }
}
