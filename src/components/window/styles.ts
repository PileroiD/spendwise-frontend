import styled from "styled-components";

interface Colors {
	[key: string]: string;
}

interface StylesProp {
	type: string;
}

const colors: Colors = {
	Incomes: "green",
	Accounts: "orange",
	Expenses: "red",
};

export const ButtonWindow = styled.button<StylesProp>`
	width: 40px;
	height: 40px;
	border-radius: 100%;
	color: #fff;
	font-size: 30px;
	background: ${({ type }) => colors[type] || "transparent"};
	border: none;
	position: absolute;
	bottom: 8px;
	left: 50%;
	transform: translateX(-50%);
	cursor: pointer;
	transition: 0.2s all;

	&:hover {
		box-shadow: 0px 0px 16px green;
		box-shadow: 0px 0px 16px ${({ type }) => colors[type] || "transparent"};
	}
`;

export const Divider = styled.div<{ type: string }>`
	width: 100%;
	height: 2px;
	background-color: green;
	margin-top: 5px;
	background-color: ${({ type }) => colors[type] || "transparent"};
`;

export const ButtonWrapper = styled.div`
	position: absolute;
	background: #fff;
	height: 55px;
	bottom: 0;
	width: 367px;
`;
