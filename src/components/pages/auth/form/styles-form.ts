import styled from "styled-components";

export const FormItem = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;

	& label {
		font-size: 13px;
		padding-left: 10px;
	}

	& input {
		height: 40px;
		padding: 6px;
		font-size: 18px;
		border: 1px solid #000;
		border-radius: 12px;
	}
`;

export const SubmitBtn = styled.button`
	width: 200px;
	background: lightblue;
	border: none;
	padding: 10px;
	border-radius: 10px;
	display: block;
	margin: 0 auto;
	font-size: 17px;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		transform: translateY(-3px);
		box-shadow: 4px 4px 0px lightslategray;
	}
`;
