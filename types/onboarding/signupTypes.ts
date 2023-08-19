export interface signUpProps {
    username: string;
    email: string;
    password: string;
    password2: string
}
export interface loginProps {
    email: string;
    password: string;
}



export interface userProp {
    user: User | undefined;
    msg: string;
}
export interface verifyOtp {
    email?: string;
    userId?: string;
    token: number;
}

export interface updateNewPassword {
    userId?: string;
    password?: string;
    password2?: string
}

export interface verifyProps {
    res: string;
    msg: string;
    user: User;

}
export interface resetProps {
    email: string
}

// login
export interface LoginTypes {
    user: User;
    msg: string;
}

export interface User {
    userId: string | undefined;
    email: string;
    roles: string[];
    token: string;
    verified: boolean;
    createdAt: Date;
    msg: string;
}


// resetPassword
export interface ResetPasswordProps {
    res: string;
    msg: string;
    user: User;
}

