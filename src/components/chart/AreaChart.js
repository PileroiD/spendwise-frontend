import styled from "styled-components";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Button } from "../button-component/Button.tsx";
import { useEffect, useState } from "react";

import { getOneAreaChartData } from "./utils/getOneAreaChartData";
import { getAllAreaChartData } from "./utils/getAllAreaChartData";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Buttons = styled.div`
	display: flex;
	justify-content: center;
	column-gap: 10px;
	margin-top: 20px;
`;

const AreaChartContainer = ({ className, account, isAll, accounts }) => {
	const [currentBtn, setCurrentBtn] = useState("incomes");
	const [chartData, setChartData] = useState(null);

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
