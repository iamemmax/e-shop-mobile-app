import { createAsyncThunk, createSlice, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { authenticateUser, Error, ForgetUser, LogUserOut, resendUserOtp, SetNewPassword, SignupUser, verifyUserOtp, VerifyUserOtp } from "../../services/auth";
import { loginProps, resetProps, signUpProps, updateNewPassword, verifyOtp } from "../../../types/onboarding/signupTypes";
import { PURGE } from 'redux-persist';





interface User {
    res?: string;
    _id?: string;
    userId?: string | undefined;
    username?: string;
    email?: string;
    roles?: string[];
    token?: string;
    verified?: boolean;
    createdAt?: Date;
    isAuthenticated?: boolean;
}
interface msgProps {
    msg?: string;

}
interface ResettProps {
    user: User | undefined;
    msg: string;
}
type userIninitailProps = {
    user: User | undefined,
    isLoading: boolean;
    msg?: string;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    isAuthenticated?: boolean;


}

export const RegisterUser = createAsyncThunk(
    "auths/create",
    async (data: signUpProps, thunkAPI) => {
        try {
            const response = await SignupUser(data)

            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const LoginUsers = createAsyncThunk(
    "auths/authenticate",
    async (data: loginProps, thunkAPI) => {
        try {
            const response = await authenticateUser(data)
            return response.data
        } catch (error: any) {
            console.log(error.response.data.msg);
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.response.data.msg ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const userVerification = createAsyncThunk(
    "auths/verify",
    async (datas: verifyOtp, thunkAPI) => {
        // const { token } = datas
        // console.log(token, "lddkdl");
        try {
            const response = await VerifyUserOtp(datas)
            console.log(response.data.msg);
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.response.data.msg ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const ResentOTP = createAsyncThunk(
    "auths/ResentOtp",
    async (userId: string, thunkAPI) => {
        try {
            const response = await resendUserOtp(userId)
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.response.data.msg ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const ResetUserPassword = createAsyncThunk(
    "auths/reset",
    async (email: string, thunkAPI) => {
        try {
            const response = await ForgetUser(email)
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.response.data.msg ||
                error.toString();
            return thunkAPI.rejectWithValue(message)

        }
    }
);


export const userResetVerification = createAsyncThunk(
    "auths/verify/reset",
    async (data: verifyOtp, thunkAPI) => {
        try {
            const response = await verifyUserOtp(data)
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);


export const updateResetNewPassword = createAsyncThunk(
    "auths/create/password",
    async (data: updateNewPassword, thunkAPI) => {
        try {
            const response = await SetNewPassword(data)
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const LogoutUser = createAsyncThunk(
    "auths/logout",
    async (_, thunkAPI) => {
        try {
            const response = await LogUserOut()
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);





const initialState: userIninitailProps = {
    user: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const AuthSlice = createSlice({
    initialState,
    name: "auths",
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers(builder) {
        builder.addCase(RegisterUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(RegisterUser.fulfilled, (state, { type, payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = payload.user;
            state.message = String(payload?.msg)
            state.isAuthenticated = false
        })
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
            state.isAuthenticated = false


        })

        // verifyuser
        builder.addCase(userVerification.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(userVerification.fulfilled, (state, { type, payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            // state.user = payload;
            state.message = String(payload?.msg)
        })
        builder.addCase(userVerification.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)

        })
        // resend otp
        builder.addCase(ResentOTP.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(ResentOTP.fulfilled, (state, { type, payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            // state.user = payload;
            state.message = String(payload.msg)
        })
        builder.addCase(ResentOTP.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)

        })
        // login users

        builder.addCase(LoginUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(LoginUsers.fulfilled, (state, { type, payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = payload.user;
            state.message = String(payload?.msg);
            state.isAuthenticated = true

        })
        builder.addCase(LoginUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
            state.isAuthenticated = false


        })

        // reset password
        builder.addCase(ResetUserPassword.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(ResetUserPassword.fulfilled, (state, action: PayloadAction<ResettProps>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            state.message = String(action.payload.msg)
            state.isAuthenticated = false

        })
        builder.addCase(ResetUserPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
            state.isAuthenticated = false


        })

        // verify user reset password
        builder.addCase(userResetVerification.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(userResetVerification.fulfilled, (state, { type, payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            // state.user = payload;
            state.message = String(payload?.msg)
            state.isAuthenticated = false

        })
        builder.addCase(userResetVerification.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
            state.isAuthenticated = false


        })
        // update user password
        builder.addCase(updateResetNewPassword.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateResetNewPassword.fulfilled, (state, { type, payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = payload.user;
            state.message = String(payload?.msg)
            state.isAuthenticated = false

        })
        builder.addCase(updateResetNewPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
            state.isAuthenticated = false


        })
        // logout user
        builder.addCase(LogoutUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(LogoutUser.fulfilled, (state, { type, payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = undefined;
            state.message = String(payload?.msg)
            state.isAuthenticated = false

        })
        builder.addCase(LogoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
            state.isAuthenticated = false


        })
        builder.addCase(PURGE, () => {
            return initialState;
        });

    },
})

export const { reset } = AuthSlice.actions;
// export const userSelector = (state: RootState) => state;
export default AuthSlice.reducer;