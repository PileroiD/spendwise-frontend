import styled from "styled-components";

interface ErrorMessageProps {
	width?: string;
	type?: string;
}

export const ErrorMessage = styled.div<ErrorMessageProps>`
	background: lightcoral;
	padding: 2px 2px 2px 10px;
	margin-top: 4px;
	border-radius: 5px;
	width: ${({ width }) => (width ? width : "100%")};

	${({ type }) => (type === "server" ? "text-align:center; margin-bottom: 10px;" : null)}
`;
