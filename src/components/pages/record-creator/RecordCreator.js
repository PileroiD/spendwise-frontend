import styled from "styled-components";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import RECORD_TYPES from "./constants/records-type";
import { InputWrapper } from "../../input-wrapper/InputWrapper";
import { SelectorWrapper } from "../../selector-wrapper/SelectorWrapper";
import { Button } from "../../button-component/Button.tsx";
import { ErrorMessage } from "../../error-form-message/ErrorMessage.tsx";
import { Message } from "../../message/Message";

import { selectAccountNames } from "../../../selectors";
import { request, correctAmount } from "../../../utils";
import { updateAccounts } from "../../../actions";
import { useShowMessage } from "../../../hooks";

const CreateAccountLink = styled(Link)`
	text-decoration: underline;
	color: blue;
`;

const RecordCreatorContainer = ({ className }) => {
	const accountNames = useSelector(selectAccountNames);
	const isIncome = useMatch("/add-incomes");
	const dispatch = useDispatch();

	const initialRecordType = isIncome ? RECORD_TYPES[0] : RECORD_TYPES[1];

	const [account, setAccount] = useState({});
	const [isAccountError, setAccountError] = useState(false);
	const [recordType, setRecordType] = useState(initialRecordType);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	const { isMessageVisible, setIsMessageVisible } = useShowMessage();

	useEffect(() => {
		const timerId = setTimeout(() => {
			setServerError(null);
		}, 4000);

		return () => clearTimeout(timerId);
	}, [serverError]);

	useEffect(() => {
		document.title = "Create record";
	}, []);

	const formik = useFormik({
		initialValues: {
			title: "",
			amount: "",
			description: "",
			imageUrl: "",
		},
		validationSchema: Yup.object({
			title: Yup.string().min(2).max(100, "Max 100 characters").required("Required"),
			amount: Yup.number().typeError("Amount must must be a number").required("Required"),
			description: Yup.string().max(500),
			imageUrl: Yup.string(),
		}),
		onSubmit: (values, { resetForm }) => {
			if (Object.keys(account).length) {
				setIsSubmitting(true);
				resetForm();

				setTimeout(() => {
					handleSubmit(values);
					setIsSubmitting(false);
				}, 1000);
			} else {
				setAccountError(true);
			}
		},
	});

	const handleSubmit = (values) => {
		const data = {
			title: values.title,
			account_name: account.label,
			account_id: account.value,
			type: recordType.value,
			amount: correctAmount(recordType.value, values.amount),
			description: values.description,
			image_url: values.imageUrl,
		};

		request("/records", "POST", data)
			.then(({ error }) => {
				if (error) {
					setServerError(error);
					return;
				}
				dispatch(updateAccounts());
				setIsMessageVisible(true);
			})
			.catch((error) => setServerError(error));
	};

	return (
		<section className={className}>
			<h2 className="title">Add a new record</h2>

			{serverError ? <ErrorMessage>{serverError}</ErrorMessage> : null}

			{accountNames.length ? null : (
				<ErrorMessage>
					You cannot create a record until you create an account.{" "}
					<CreateAccountLink to={"/add-accounts"}>Create account</CreateAccountLink>
				</ErrorMessage>
			)}

			<form onSubmit={formik.handleSubmit}>
				<InputWrapper>
					<label htmlFor="title">Record title*</label>
					<input
						id="title"
						name="title"
						type="text"
						placeholder="Record title..."
						{...formik.getFieldProps("title")}
					/>
					{formik.errors.title && formik.touched.title ? (
						<ErrorMessage width="350px">{formik.errors.title}</ErrorMessage>
					) : null}
				</InputWrapper>

				<SelectorWrapper>
					<div className="label">Account*:</div>
					<Select
						options={accountNames.map(({ accountName, accountId }) => ({
							label: accountName,
							value: accountId,
						}))}
						placeholder="Choose an account"
						onChange={(selectedOption) => {
							setAccount(selectedOption);
							setAccountError(false);
						}}
					/>
					{isAccountError && <ErrorMessage>Account required*</ErrorMessage>}
				</SelectorWrapper>

				<SelectorWrapper marginbottom="25px">
					<div className="label">Record type*:</div>
					<Select
						options={RECORD_TYPES}
						placeholder="Choose record type"
						onChange={(selectedOption) => setRecordType(selectedOption)}
						defaultValue={initialRecordType}
					/>
				</SelectorWrapper>

				<InputWrapper>
					<label htmlFor="amount">Record amount*: </label>
					<input
						id="amount"
						name="amount"
						placeholder="Record amount..."
						{...formik.getFieldProps("amount")}
					/>
					{formik.errors.amount && formik.touched.amount ? (
						<ErrorMessage>{formik.errors.amount}</ErrorMessage>
					) : null}
				</InputWrapper>

				<InputWrapper>
					<label htmlFor="description">Description: </label>
					<textarea
						id="description"
						name="description"
						type="text"
						placeholder="Description..."
						{...formik.getFieldProps("description")}
					/>
					{formik.errors.description && formik.touched.description ? (
						<ErrorMessage>{formik.errors.description}</ErrorMessage>
					) : null}
				</InputWrapper>

				<InputWrapper width="800px">
					<label htmlFor="imageUrl">Record icon: </label>
					<input
						id="imageUrl"
						name="imageUrl"
						type="text"
						placeholder="Icon URL..."
						{...formik.getFieldProps("imageUrl")}
					/>
					{formik.errors.imageUrl && formik.touched.imageUrl ? (
						<ErrorMessage>{formik.errors.imageUrl}</ErrorMessage>
					) : null}
				</InputWrapper>

				<Button
					width="150px"
					height="35px"
					type="submit"
					disabled={isSubmitting || !accountNames.length}
				>
					Create new record
				</Button>
			</form>

			{isMessageVisible && <Message text="You have successfully added a new record" />}
		</section>
	);
};

const RecordCreator = styled(RecordCreatorContainer)`
	padding: 50px 10px 0 10px;
	position: relative;
	overflow: hidden;

	& form {
		padding: 20px;
	}
`;

export default RecordCreator;
