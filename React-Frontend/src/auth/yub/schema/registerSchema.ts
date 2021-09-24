import * as yup from "yup";

export const registerValidationSchema = yup.object({
  username: yup
    .string()
    .min(4, "Must be 4 characters or more")
    .required("Username is Required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: yup
    .string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm-Password is required"),
});
