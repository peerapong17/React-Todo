import axios, { AxiosResponse } from "axios";

const http = axios.create({ baseURL: "http://localhost:4000/auth" });

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
    url: "/login",
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
    url: "/register",
  });

export const logoutUser = (): Promise<AxiosResponse<{
  message: string;
}>> =>
  http.request<{ message: string }>({
    method: "GET",
    url: "/logout",
  });
