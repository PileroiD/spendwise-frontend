import React, { useMemo } from "react";
import styled from "styled-components";
import { useMatch } from "react-router-dom";

import { Icon, Name, Amount, Category, Date, Info, Descr } from "./styles";
import { sliceString, getProperDate } from "../../utils";
import { Account, Record } from "../../types/types";

interface RecordItemProps {
	className?: string;
	item: Record | Account;
	type: string;
}

function isAccountInstance(instance: Record | Account): instance is Account {
	return (instance as Account).initialAmount !== undefined;
}

const RecordItemContainer: React.FC<RecordItemProps> = ({ className, item }) => {
	const isMainPage: boolean = useMatch("/") !== null;

	const type = !isAccountInstance(item) ? item.type : "Accounts";
	const category = !isAccountInstance(item) ? item.accountName : null;

	const description = useMemo(() => {
		return !isAccountInstance(item) ? sliceString(item.description, 80) : null;
	}, [item]);

	return (
		<div className={className}>
			<Icon src={item.imageUrl} alt="icon" />
			<div className="info-wrapper">
				<Info>
					<Name>{sliceString(item.title, 35)}</Name>

					<Amount type={type}>{item.amount ? item.amount + " $" : null}</Amount>
				</Info>

				{isMainPage ? null : <Descr>{description}</Descr>}

				<Info>
					<Category>{category}</Category>
					<Date>{getProperDate(item.createdAt)}</Date>
				</Info>
			</div>
		</div>
	);
};

export const RecordItem = styled(RecordItemContainer)<RecordItemProps>`
	position: relative;
	margin-top: 7px;
	display: grid;
	align-items: center;
	grid-template-columns: 30px auto;
	column-gap: 10px;
	border: 1px solid #000;
	padding: 4px;
	border-radius: 3px;
	transition: 0.2s all;
	cursor: ${({ type }) => (type === "Accounts" ? "auto" : "pointer")};

	${({ type }) =>
		type === "Accounts"
			? ""
			: `&:hover {
        transform: translateY(-1px);
        box-shadow: 0px 0px 3px #000;
    }`};
`;
