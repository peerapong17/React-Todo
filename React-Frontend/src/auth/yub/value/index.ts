import { UserLogin, UserRegister } from "../model";

export const loginState: UserLogin = {
  email: "",
  password: "",
};

export const registerState: UserRegister = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
