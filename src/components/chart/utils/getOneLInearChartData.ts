import { Account } from "../../../types/types";
import { getProperDate } from "../../../utils/getProperDate";
import { getRandomColor } from "../../../utils/getRandomColor";

export const getOneLInearChartData = (account: Account) => {
	let currentAmount = account.initialAmount;

	return {
		labels: [
			getProperDate(account.createdAt),
			...account.records.map((record) => getProperDate(record.createdAt)),
		],
		datasets: [
			{
				label: account.title,
				data: [
					account.initialAmount,
					...account.records.map((record) => {
						currentAmount = currentAmount + record.amount;
						return currentAmount;
					}),
				],
				fill: true,
				borderColor: getRandomColor(),
				tension: 0.3,
			},
		],
	};
};
