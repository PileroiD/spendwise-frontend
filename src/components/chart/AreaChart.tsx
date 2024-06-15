import styled from "styled-components";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Button } from "../button-component/Button";
import { useEffect, useState } from "react";

import { getOneAreaChartData } from "./utils/getOneAreaChartData";
import { getAllAreaChartData } from "./utils/getAllAreaChartData";
import { Account } from "../../types/types";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Buttons = styled.div`
	display: flex;
	justify-content: center;
	column-gap: 10px;
	margin-top: 20px;
`;

interface AreaChartProps {
	className?: string;
	account: Account | string;
	isAll: boolean;
	accounts: Account[];
}

interface Data {
	labels: string[] | undefined;
	datasets: {
		label: string;
		data: number[] | undefined;
		backgroundColor: string[];
		borderWidth: number;
	}[];
}

const AreaChartContainer: React.FC<AreaChartProps> = ({ className, account, isAll, accounts }) => {
	const [currentBtn, setCurrentBtn] = useState<string>("incomes");
	const [chartData, setChartData] = useState<Data | null>(null);

	useEffect(() => {
		if (isAll) {
			const data = getAllAreaChartData(accounts);
			setChartData(data);
		} else {
			const data = getOneAreaChartData(account, currentBtn);
			setChartData(data);
		}
	}, [currentBtn, account]);

	return (
		<div className={className}>
			{chartData && <PolarArea className={className} data={chartData} />}
			<Buttons>
				{!isAll ? (
					<>
						<Button
							onClick={() => setCurrentBtn("incomes")}
							current={currentBtn === "incomes" ? "true" : ""}
						>
							Incomes
						</Button>
						<Button
							onClick={() => setCurrentBtn("expenses")}
							current={currentBtn === "expenses" ? "true" : ""}
						>
							Expenses
						</Button>
					</>
				) : null}
			</Buttons>
		</div>
	);
};

export const AreaChart = styled(AreaChartContainer)`
	display: flex;
	flex-direction: column;
`;
