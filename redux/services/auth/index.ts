import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";
import { LoginTypes, ResetPasswordProps, User, loginProps, resetProps, signUpProps, updateNewPassword, userProp, verifyOtp, verifyProps } from "../../../types/onboarding/signupTypes";

export interface Error {
    res: string;
    msg: string;
}



export const SignupUser = async (userData: signUpProps) => {
    const data = await axios.post<userProp>(`${baseUrl}/users/create`, userData)
    return data
}

export const VerifyUserOtp = async (datas: verifyOtp) => {
    // console.log("datas");
    const { token, userId } = datas

    const data = await axios.put<verifyProps>(`${baseUrl}/users/verify/${userId}`, {
        'token': token
    })

    return data
}


export const resendUserOtp = async (userId: string) => {
    const data = await axios.put<verifyProps>(`${baseUrl}/users/resend-otp/${userId}`)
    return data
}



export const authenticateUser = async (userData: loginProps) => {
    const data = await axios.post<LoginTypes>(`${baseUrl}/users/authenticate`, userData)
    return data
}



export const ForgetUser = async (email: string) => {
    const datas = await axios.get<ResetPasswordProps>(`${baseUrl}/users/forgetpassword/${email}`)
    return datas
}

// verify user password reset
export const verifyUserOtp = async (datas: verifyOtp) => {
    const data = await axios.put<ResetPasswordProps>(`${baseUrl}/users/verify/reset/${datas.email}`, {
        'token': datas.token
    })
    return data
}

// verify user password reset
export const SetNewPassword = async (datas: updateNewPassword) => {
    const data = await axios.put<ResetPasswordProps>(`${baseUrl}/users/reset/update/${datas.userId}`, {
        'password': datas.password
    })
    return data
}


// verify user password reset
export const LogUserOut = async () => {
    const data = await axios.get(`${baseUrl}/users/logout`)
    return data
}