import { http } from "./http";
import { AxiosResponse } from "axios";
import { Todo } from "../states/models/todo";

export const fetchData = async (): Promise<
  AxiosResponse<{ todoList: Todo[] }>
> =>
  await http.request<{ todoList: Todo[] }>({
    method: "GET",
    url: "/todo",
  });

export const createTodo = (value: {
  task: string;
}): Promise<
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
