import { Account } from "../../../types/types";
import { createRandomColorsArray } from "./createRandomColorsArray";

export const getAllAreaChartData = (accounts: Account[]) => {
	return {
		labels: accounts.map((account) => account.title),
		datasets: [
			{
				label: "All money ",
				data: accounts.map((account) => account.amount),
				backgroundColor: createRandomColorsArray(accounts.length),
				borderWidth: 1,
			},
		],
	};
};
