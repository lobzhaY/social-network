import axios from 'axios';
import { API_URL, headers } from '../constants';

export enum ResultCodes {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers,
});

export type GetItemsType<T> = {
    items: T[],
    totalCount: number,
    error: string | null,
}

export type ResponseType<T = {}, U = ResultCodes> = {
    data: T,
    resultCode: U,
    messages: string[],
}
