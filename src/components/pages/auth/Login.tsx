import styled from "styled-components";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Form } from "./form/Form";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

import { useDefineFormikSettings } from "../../../hooks";
import { request } from "../../../utils";
import { setUser } from "../../../actions";
import { selectUserId } from "../../../selectors";
import { Dispatch } from "redux";
import { User } from "../../../types/types";

interface FormikProps {
	email: string;
	password: string;
}

interface LoginRequestResponse {
	error: null | string;
	user: null | User;
}

const LoginContainer: React.FC<{ className?: string }> = ({ className }) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const { initialValues, yupSchema, isLogin } = useDefineFormikSettings();
	const isAuthenticated: boolean = useSelector(selectUserId);

	const dispatch: Dispatch = useDispatch();
	const navigate = useNavigate();

	if (isAuthenticated) {
		navigate("/");
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: yupSchema,
		onSubmit: (values: FormikProps, { resetForm }) => {
			setIsSubmitting(true);
			resetForm();

			setTimeout(() => {
				handleSubmit(values);
				setIsSubmitting(false);
			}, 1000);
		},
	});

	useEffect(() => {
		document.title = "Login";
	}, []);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setServerError(null);
		}, 3000);

		return () => clearTimeout(timerId);
	}, [serverError]);

	const handleSubmit = (values: FormikProps) => {
		const data: FormikProps = {
			email: values.email,
			password: values.password,
		};

		request("/login", "POST", data).then(({ error, user }: LoginRequestResponse) => {
			if (error) {
				setServerError(error);
				return;
			}

			sessionStorage.setItem("user", JSON.stringify(user));
			if (user) dispatch(setUser(user));
			navigate("/");
		});
	};

	return (
		<section className={className}>
			<h2>Log in</h2>
			<ErrorBoundary>
				<Form
					formik={formik}
					isLogin={isLogin}
					isSubmitting={isSubmitting}
					serverError={serverError}
				/>
			</ErrorBoundary>
		</section>
	);
};

const Login = styled(LoginContainer)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%) translateX(-50%);
	left: 50%;

	& h2 {
		text-align: center;
		margin-bottom: 30px;
	}
`;

export default Login;
