import { useState } from "react";
import styled from "styled-components";

import { LineChart } from "./LineChart";
import { AreaChart } from "./AreaChart";
import { getOneLInearChartData } from "./utils/getOneLInearChartData";
import { getAllLinearChartData } from "./utils/getAllLinearChartData";
import { Account } from "../../types/types";

const Accounts = styled.div`
	display: flex;
	flex-wrap: wrap;
	column-gap: 10px;
	margin-left: 20px;
	font-size: 20px;
	background: #fff;
	transform: translateY(-14px);
`;

const AccountName = styled.div<{ current: string }>`
	padding: 5px;
	border-radius: 8px;
	transform: translateY(9px);
	position: relative;
	transition: 0.2s all;
	background: ${({ current }) => (current === "true" ? "lightgray" : "#fff")};
	cursor: pointer;

	&:hover {
		background: lightgray;
	}
`;

interface ChartProps {
	className?: string;
	accounts: Account[];
}

const ChartContainer: React.FC<ChartProps> = ({ className, accounts }) => {
	const [currentAccount, setCurrentAccount] = useState<Account | string>(accounts[0]);
	const [isAll, setIsAll] = useState<boolean>(false);

	return (
		<section className={className}>
			<h2 className="title">Last 30 days:</h2>
			<Accounts>
				{accounts.map((account) => (
					<AccountName
						onClick={() => {
							setCurrentAccount(account);
							setIsAll(false);
						}}
						key={account.id}
						current={account.id === (currentAccount as Account).id ? "true" : ""}
					>
						{account.title}
					</AccountName>
				))}

				<AccountName
					onClick={() => {
						setCurrentAccount("all");
						setIsAll(true);
					}}
					current={currentAccount === "all" ? "true" : ""}
				>
					All
				</AccountName>
			</Accounts>
			<div className="chart">
				<LineChart
					data={
						isAll
							? getAllLinearChartData(accounts)
							: getOneLInearChartData(currentAccount as Account)
					}
				/>
				<div className="area-chart-wrapper">
					<AreaChart account={currentAccount} isAll={isAll} accounts={accounts} />
				</div>
			</div>
		</section>
	);
};

export const ChartComponent = styled(ChartContainer)`
	margin-top: 30px;

	& .chart {
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 400px;
		border: 2px solid black;
		border-radius: 20px;
		padding: 10px;
	}

	& .title {
		margin-bottom: 13px;
	}
`;
