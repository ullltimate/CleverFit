import { IValidationMessage } from "../types/types";

export const validateMessage: IValidationMessage = {
    require: 'Обязательное поле!',
    email: 'Example@gmail.com'
}

export const regEmail = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;