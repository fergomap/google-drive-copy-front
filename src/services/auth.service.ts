import User from "model/user";
import { JsonConvert } from 'json2typescript';
import UserImp from "model/user.imp";
import axios from 'axios';
import { APP_CONSTANTS } from "config/app.config";
import { getAxiosHeader, toBase64 } from "./utils.service";
import { SignUpFormData } from "components/sign-up/sign-up.component";

const jsonConvert: JsonConvert = new JsonConvert();

export const getUserData = (): Promise<User> => {
    return axios.get(APP_CONSTANTS.ENDPOINTS.USER_INFO, getAxiosHeader(localStorage.drive_copy_token))
        .then(res => jsonConvert.deserializeObject(res.data.user, UserImp));
};

export const logIn = (email: string, password: string): Promise<User> => {
    return axios.post(APP_CONSTANTS.ENDPOINTS.LOG_IN, { email, password })
        .then(res => {
            localStorage.drive_copy_token = res.data.token;
            return jsonConvert.deserializeObject(res.data.user, UserImp);
        });
};

export const signUp = async(data: SignUpFormData): Promise<User> => {
    const body = { ...data, avatar: await toBase64(data.file) };

    return axios.post(APP_CONSTANTS.ENDPOINTS.SIGN_UP, body)
        .then(res => {
            localStorage.drive_copy_token = res.data.token;
            return jsonConvert.deserializeObject(res.data.user, UserImp);
        });
};
