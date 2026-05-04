const otpStore = new Map()

export const saveOTP = (email, otp) => {
   const finalData = {
        ...otp,
        expires: Date.now() + 10 * 60 * 1000
    };

    otpStore.set(email, finalData);

    return finalData;
}

export const getOTPData = (email) => otpStore.get(email);

export const deleteOTP = (email) => otpStore.delete(email);

// export const verifyOTP = (email, otp) => {
//     const data = otpStore.get(email)
//     if (!data) return false;
//     if (data.expires < Date.now()) return false;
//     if (data.otp !== otp) return false;

//     otpStore.delete(email);
//     return true;
// }
