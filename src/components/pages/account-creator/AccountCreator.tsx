import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Button } from "../../button-component/Button";
import { InputWrapper } from "../../input-wrapper/InputWrapper";
import { ErrorMessage } from "../../error-form-message/ErrorMessage";
import { Message } from "../../message/Message";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

import { request } from "../../../utils/index";
import { updateAccounts } from "../../../actions/index";
import { ShowMessage, useShowMessage } from "../../../hooks/index";
import { AccountName, selectAccountNames } from "../../../selectors/index";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../store";
import { AnyAction } from "redux";
import { Account } from "../../../types/types";

interface FormikProperties {
	title: string;
	amount: string;
	imageUrl: string;
}

interface AccountPostResponse {
	error: null | string;
	account: null | Account;
}

const AccountCreatorContainer: React.FC<{ className?: string }> = ({ className }) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
	const { isMessageVisible, setIsMessageVisible }: ShowMessage = useShowMessage();

	const accountNames: AccountName[] = useSelector(selectAccountNames);
	const isMaxAccounts: boolean = accountNames.length >= 10 ? true : false;

	useEffect(() => {
		const timerId = setTimeout(() => {
			setServerError(null);
		}, 4000);

		return () => clearTimeout(timerId);
	}, [serverError]);

	const formik = useFormik({
		initialValues: {
			title: "",
			amount: "",
			imageUrl: "",
		},
		validationSchema: Yup.object({
			title: Yup.string().min(2).max(100, "Max 100 characters").required("Required"),
			amount: Yup.number().required("Required"),
			imageUrl: Yup.string(),
		}),
		onSubmit: (values: FormikProperties, { resetForm }) => {
			setIsSubmitting(true);
			resetForm();

			setTimeout(() => {
				handleSubmit(values);
				setIsSubmitting(false);
			}, 1000);
		},
	});

	const handleSubmit = (values: FormikProperties) => {
		const data = {
			title: values.title,
			initialAmount: values.amount,
			image_url: values.imageUrl,
		};

		request("/accounts", "POST", data)
			.then(({ error }: AccountPostResponse) => {
				if (error) {
					setServerError(error);
					return;
				}

				dispatch(updateAccounts());
				setIsMessageVisible(true);
			})
			.catch((error) => setServerError(error));
	};

	useEffect(() => {
		document.title = "Create account";
	}, []);

	return (
		<section className={className}>
			<h2>Add account:</h2>

			{serverError ? <ErrorMessage>{serverError}</ErrorMessage> : null}

			{isMaxAccounts ? (
				<ErrorMessage>You cannot create more than 10 accounts</ErrorMessage>
			) : null}

			<ErrorBoundary>
				<form onSubmit={formik.handleSubmit}>
					<InputWrapper>
						<label htmlFor="title">Account name* </label>
						<input
							type="text"
							placeholder="Account name..."
							{...formik.getFieldProps("title")}
						/>
						{formik.errors.title && formik.touched.title ? (
							<ErrorMessage width="350px">{formik.errors.title}</ErrorMessage>
						) : null}
					</InputWrapper>

					<InputWrapper>
						<label htmlFor="amount">Initial amount* </label>
						<input
							type="number"
							placeholder="Initial amount..."
							{...formik.getFieldProps("amount")}
						/>
						{formik.errors.amount && formik.touched.amount ? (
							<ErrorMessage width="350px">{formik.errors.amount}</ErrorMessage>
						) : null}
					</InputWrapper>

					<InputWrapper>
						<label htmlFor="img">Account icon URL </label>
						<input
							type="url"
							placeholder="Account icon URL..."
							{...formik.getFieldProps("imageUrl")}
						/>
						{formik.errors.imageUrl && formik.touched.imageUrl ? (
							<ErrorMessage width="350px">{formik.errors.imageUrl}</ErrorMessage>
						) : null}
					</InputWrapper>

					<Button width="150px" height="35px" disabled={isSubmitting || isMaxAccounts}>
						Create new account
					</Button>
				</form>
			</ErrorBoundary>

			{isMessageVisible && <Message text="You have successfully created a new account" />}
		</section>
	);
};

const AccountCreator = styled(AccountCreatorContainer)`
	padding: 50px 10px 0 10px;
	position: relative;

	& form {
		padding: 20px;
	}
`;

export default AccountCreator;
