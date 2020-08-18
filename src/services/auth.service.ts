import User from "model/user";
import { JsonConvert } from 'json2typescript';
import UserImp from "model/user.imp";

const jsonConvert: JsonConvert = new JsonConvert();

export const getUserData = (token?: string): Promise<User> => {
    return new Promise((resolve: Function) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            resolve(jsonConvert.deserializeObject(token ? getUserObj() : {}, UserImp));
        }, 1000);
    });
};

export const logIn = (email: string, password: string): Promise<User> => {
    return new Promise((resolve: Function) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            resolve(jsonConvert.deserializeObject(getUserObj(undefined, email), UserImp));
        }, 1000);
    });
};

const getUserObj = (name: string = 'Fernando Gómez', email: string = 'fernando@gmail.com') => ({
    name,
    email,
    avatar: 'https://2mingenieria.com.ve/wp-content/uploads/2018/10/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg',
    token: 'token'
});
