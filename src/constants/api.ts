import { IUrlAPI } from "@tstypes/api";

export const urlAPI: IUrlAPI = 'https://marathon-api.clevertec.ru';

export const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
}
