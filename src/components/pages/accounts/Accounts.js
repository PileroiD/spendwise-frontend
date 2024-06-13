import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { RecordItem } from "../../recordItem/RecordItem";
import { IconComponent } from "../../icon-component/IconComponent";
import { Record } from "../records/styles";
import { Message } from "../../message/Message";
import { NoData } from "../../no-data/NoData";
import ErrorBoundary from "../../error-boundary/ErrorBoundary.tsx";

import { selectAccounts } from "../../../selectors";
import { BinIcon } from "../../../icons";
import { request } from "../../../utils";
import { useShowMessage } from "../../../hooks";
import { updateAccounts } from "../../../actions";

const AccountsContainer = ({ className }) => {
	let accounts = useSelector(selectAccounts);
	const [accountsList, setAccountsList] = useState(accounts);
	const { isMessageVisible, setIsMessageVisible } = useShowMessage();

	const dispatch = useDispatch();

	const deleteAccount = (account) => {
		request(`/accounts/${account.id}`, "DELETE").then(({ error }) => {
			if (error) return;

			const filteredAccountsList = accountsList.filter(
				(curAccount) => curAccount.id !== account.id
			);

			setAccountsList(filteredAccountsList);
			setIsMessageVisible(true);

			dispatch(updateAccounts());
		});
	};

	useEffect(() => {
		setAccountsList(accounts);
	}, [accounts]);

	useEffect(() => {
		document.title = "Accounts";
	}, []);

	return (
		<section className={className}>
			<h2>Accounts: </h2>

			<ErrorBoundary>
				{accountsList.length ? (
					accountsList.map((account) => (
						<Record key={account.id}>
							<RecordItem key={account.id} item={account} type="Accounts" />
							<IconComponent>
								<div
									className="bin"
									onClick={() => {
										if (!isMessageVisible) {
											deleteAccount(account);
										}
									}}
								>
									<BinIcon disabled={isMessageVisible} />
								</div>
							</IconComponent>
						</Record>
					))
				) : (
					<NoData mainText="No Data" emptyText="You haven't added any account yet" />
				)}
			</ErrorBoundary>

			{isMessageVisible && <Message text="You have successfully deleted the account" />}
		</section>
	);
};

const Accounts = styled(AccountsContainer)`
	padding: 50px 10px;
	position: relative;

	& h2 {
		margin-bottom: 10px;
	}

	& .bin {
		transform: translateY(4px);
	}

	svg {
		display: block;
		margin: 0 auto;
	}
`;

export default Accounts;
