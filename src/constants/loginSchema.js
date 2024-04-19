import * as Yup from "yup";

export default Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email address"
        ),
    password: Yup.string()
        .required("Required")
        .matches(
            /^[\w#%]+$/,
            "Only letters, numbers and (#, %) characters are available for password"
        )
        .min(8, "Password must be at least 8 characters")
        .max(30, "Invalid password. Max 30 characters"),
});
