import { http } from './http';
import { AxiosResponse } from "axios";

export const enterEmail = (value: {
  email: string;
}): Promise<
  AxiosResponse<{
    message: string;
  }>
> =>
  http.request<{ message: string }>({
    data: value,
    url: "/enter-email",
  });

export const enterNewPassword = (
  value: { password: string },
  userId: string,
  token: string
): Promise<
  AxiosResponse<{
    message: string;
  }>
> =>
  http.request<{ message: string }>({
    data: value,
    url: `/enter-new-password/${userId}/${token}`,
  });
