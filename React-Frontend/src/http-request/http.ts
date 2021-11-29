import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((res) => {
  if (localStorage.getItem("token")) {
    res.headers.Authorization =
      "Bearer " + JSON.parse(localStorage.getItem("token")!);
  }

  return res;
});
