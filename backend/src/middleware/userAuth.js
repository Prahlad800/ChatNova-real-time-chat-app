import joi from "joi"
export const signupAuth = (req, res, next) => {
    const authSchema = joi.object({
        name: joi.string().min(4).max(100).required(),
        email: joi.string().email().required(),
        DOB: joi.date().required(),
        gender: joi.string().valid("male", "female", "other")
            .required(),
        password: joi.string()
            .min(8)
            .max(30)
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"
                )
            )
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password cannot exceed 30 characters",
                "string.pattern.base":
                    "Password must contain uppercase, lowercase, number and special character"
            })


    })

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
            // message: result
        });
    }
    next()
}



export const loginAuth = (req, res, next) => {
    const authSchema = joi.object({
        
        email: joi.string().email().required(),
        
        
        password: joi.string()
            .min(8)
            .max(30)
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"
                )
            )
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password cannot exceed 30 characters",
                "string.pattern.base":
                    "Password must contain uppercase, lowercase, number and special character"
            })


    })

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
            // message: result
        });
    }
    next()
}

export const otpAuth = (req, res, next) => {

    const authSchema = joi.object({

        email: joi.string()
            .email()
            .required(),

        otp: joi.string()
            .length(6)
            .required()
            .messages({
                "string.length": "OTP must be 6 digits"
            })

    });

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }

    next();
}

