import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is Required"),
  password: yup
    .string()
    .required("Password is required"),
});
