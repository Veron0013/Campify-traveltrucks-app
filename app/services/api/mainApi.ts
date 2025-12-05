import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{
  error: string;
}>;

export const mainApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROXY_API_URL,
});
