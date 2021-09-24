import axios, { AxiosResponse } from "axios";
import { Todo, UserData } from "../redux/models/todo";

const http = axios.create({
  baseURL: "http://localhost:4000",
});

http.interceptors.request.use((res) => {
  if (localStorage.getItem("userData")) {
    res.headers.Authorization =
      "Bearer " + JSON.parse(localStorage.getItem("userData")!);
  }

  return res;
});

export const fetchData = async (): Promise<AxiosResponse<UserData>> =>
  await http.request<UserData>({
    method: "GET",
    url: "/todo",
  });

export const createTodo = (
  value: {task: string}
): Promise<
  AxiosResponse<{
    data: Todo;
  }>
> =>
  http.request<{ data: Todo }>({
    method: "POST",
    data: value,
    url: "/todo/create",
  });

export const updateTodo = (
  id: string,
  value: { task: string; isCompleted: boolean }
): Promise<
  AxiosResponse<{
    data: Todo;
  }>
> =>
  http.request<{ data: Todo }>({
    method: "PUT",
    data: value,
    url: `/todo/update/${id}`,
  });

export const deleteTodo = (id: string): Promise<AxiosResponse<string>> =>
  http.request<string>({
    method: "DELETE",
    url: `/todo/delete/${id}`,
  });
