import { http } from './http';
import { AxiosResponse } from "axios";


export const loginUser = (value: {
  username: string;
  password: string;
}): Promise<
  AxiosResponse<{
    message: string;
    accessToken: string;
    authenticated: boolean;
  }>
> =>
  http.request<{
    message: string;
    accessToken: string;
    authenticated: boolean;
  }>({
    method: "POST",
    data: value,
    withCredentials: true,
    url: "/auth/login",
  });

export const createUser = (value: {
  username: string;
  email: string;
  password: string;
}): Promise<
  AxiosResponse<{
    message: string;
  }>
> =>
  http.request<{ message: string }>({
    method: "POST",
    data: value,
    url: "/auth/register",
  });

export const fetchProfile = (): Promise<
  AxiosResponse<{
    username: string;
  }>
> =>
  http.request<{ username: string }>({
    method: "GET",
    url: "/auth/user-profile",
  });

export const logoutUser = (): Promise<
  AxiosResponse<{
    message: string;
  }>
> =>
  http.request<{ message: string }>({
    method: "GET",
    url: "/auth/logout",
  });
