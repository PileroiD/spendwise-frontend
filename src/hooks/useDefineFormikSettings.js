import { useMatch } from "react-router-dom";
import loginSchema from "../constants/loginSchema";
import registerSchema from "../constants/registerSchema";

export const useDefineFormikSettings = () => {
    const isLogin = useMatch("/login");

    if (isLogin) {
        return {
            initialValues: {
                email: "",
                password: "",
            },
            yupSchema: loginSchema,
            isLogin,
        };
    } else {
        return {
            initialValues: {
                email: "",
                password: "",
                confirmPassword: "",
            },
            yupSchema: registerSchema,
            isLogin,
        };
    }
};
