import { useMatch } from "react-router-dom";
import * as Yup from "yup";

import loginSchema, { LoginFormValues } from "../constants/loginSchema";
import registerSchema from "../constants/registerSchema";

interface LoginSchema {
	initialValues: {
		email: string;
		password: string;
	};
	yupSchema: Yup.ObjectSchema<LoginFormValues, Yup.AnyObject, any, "">;
	isLogin: boolean;
}

interface RegisterSchema extends LoginSchema {
	initialValues: {
		email: string;
		password: string;
		confirmPassword: string;
	};
}

export const useDefineFormikSettings = (): LoginSchema | RegisterSchema => {
	const isLogin = useMatch("/login") !== null;

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
