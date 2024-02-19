import { IValidationMessage } from "@tstypes/types";

export const validateMessage: IValidationMessage = {
    require: 'Обязательное поле!',
    email: 'Example@gmail.com',
    password: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    repeatPassword: 'Пароли не совпадают'
}

export const regEmail = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;

export const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/