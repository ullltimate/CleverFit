export type RequestLogin = {
    email: string;
    password: string;
}

export type ResponseLogin = {
    accessToken: string;
}

export type RequestCheck = {
    email: string;
}

export type ResponseCheck = {
    email: string;
    message: string;
}

export type RequestConfirm = {
    email: string;
    code: string;
}

export type RequestChangePass = {
    password: string;
    confirmPassword: string;
}

export type ResponseChangePass = {
    message: string;
}