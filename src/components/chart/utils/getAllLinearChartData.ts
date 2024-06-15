import { Account } from "../../../types/types";
import { getRandomColor } from "../../../utils/getRandomColor";

export const getAllLinearChartData = (accounts: Account[]) => {
	let maxRecordsAmount: number = 0;
	accounts.forEach((account) => {
		if (account.records.length > maxRecordsAmount) {
			maxRecordsAmount = account.records.length;
		}
	});

	return {
		labels: Array(maxRecordsAmount).fill(""),
		datasets: accounts.map((account) => {
			let currentAmount = account.initialAmount;

			return {
				label: account.title,
				data: account.records.map((record) => {
					currentAmount = currentAmount + record.amount;
					return currentAmount;
				}),
				fill: true,
				borderColor: getRandomColor(),
				tension: 0.2,
			};
		}),
	};
};
