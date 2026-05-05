import { User } from "../model/userModel.js";
import { saveOTP, getOTPData, deleteOTP } from "../otp/otpStore.js";
import { sendEmailOTP } from "../otp/mailer.js";
import bcrypt from "bcrypt"
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        let { name, DOB, email, password, gender } = req.body;
        email = email.trim().toLowerCase();
        if (!name || !DOB || !email || !password || !gender) {
            res.status(400)
                .json({
                    message: "all fild requed ",
                    success: false
                })
        }
        const check_user = await User.findOne({ email })

        if (check_user) {
            return res.status(400)
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

        const existingOTP = await sendEmailOTP(email, otp);
        if (existingOTP && existingOTP.expires > Date.now()) {
            return res.json({ message: "OTP already sent. Please wait." });
        }

      

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
export const verifyOTP = async (req, res) => {
    try {
        let { email, otp } = req.body
        email = email.trim().toLowerCase();
        const data = getOTPData(email)
      
        if (!data) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        if (data.expires < Date.now()) {
            deleteOTP(email);
            return res.status(400).json({ message: "OTP expired" });
        }

        if (data.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }


        const jwtTokem = jwt.sign(
            {
                email: data.email
            },
            process.env.JWT_KEY,
            { expiresIn: '6h' }
        )
        res.cookie("token", jwtTokem, {
            httpOnly: true,
            secure: false, // production me true
            maxAge: 6 * 60 * 60 * 1000
        })

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            DOB: data.DOB,
            gender: data.gender
        });

        deleteOTP(email);

        res.json({
            success: true,
            message: "Signup successfully",
            user
        });

    } catch (errer) {
        res.status(500)
            .json({
                message: `signup errer ${errer}`,
                success: false
            })
    }
}
