import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options: ChartOptions<"line"> = {
	responsive: true,
	interaction: {
		mode: "index",
		intersect: false,
	},
	scales: {
		y: {
			type: "linear",
			display: true,
			position: "left",
		},
	},
};

const LineChartContainer = ({ data }: any) => {
	return <Line options={options} data={data} />;
};

export const LineChart = styled(LineChartContainer)`
	display: block;
	height: 370px;
	width: 680px;
`;
