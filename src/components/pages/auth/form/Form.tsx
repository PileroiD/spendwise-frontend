import styled from "styled-components";

import { ErrorMessage } from "../../../error-form-message/ErrorMessage";
import { FormItem, SubmitBtn } from "./styles-form";

interface FormProps {
	className?: string;
	formik: any;
	isLogin: boolean;
	isSubmitting: boolean;
	serverError: string | null;
}

const FormContainer: React.FC<FormProps> = ({
	className,
	formik,
	isLogin,
	isSubmitting,
	serverError,
}) => {
	return (
		<>
			{serverError ? <ErrorMessage type="server">{serverError}</ErrorMessage> : null}

			<form className={className} onSubmit={formik.handleSubmit}>
				<FormItem>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						name="email"
						type="email"
						{...formik.getFieldProps("email")}
					/>
					{formik.errors.email && formik.touched.email ? (
						<ErrorMessage>{formik.errors.email}</ErrorMessage>
					) : null}
				</FormItem>

				<FormItem>
					<label htmlFor="password">Password:</label>
					<input
						id="password"
						name="password"
						type="password"
						{...formik.getFieldProps("password")}
					/>
					{formik.errors.password && formik.touched.password ? (
						<ErrorMessage>{formik.errors.password}</ErrorMessage>
					) : null}
				</FormItem>

				{!isLogin && (
					<FormItem>
						<label htmlFor="confirmPassword">Confirm password:</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							{...formik.getFieldProps("confirmPassword")}
						/>
						{formik.errors.confirmPassword && formik.touched.confirmPassword ? (
							<ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
						) : null}
					</FormItem>
				)}

				<SubmitBtn disabled={isSubmitting} type="submit" className="submitBtn">
					Submit
				</SubmitBtn>
			</form>
		</>
	);
};

export const Form = styled(FormContainer)`
	display: flex;
	flex-direction: column;
	width: 400px;
`;
