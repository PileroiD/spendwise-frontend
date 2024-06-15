import { Account } from "../../../types/types";
import { sliceString } from "../../../utils/sliceString";
import { createRandomColorsArray } from "./createRandomColorsArray";

interface GetDataByType {
	labels: string[] | undefined;
	data: number[] | undefined;
}

const getDataByType = (account: Account | string, type: string): GetDataByType => {
	let filteredData;
	if (typeof account === "object") {
		filteredData = account.records.filter((record) => {
			if (type === "incomes") {
				return record.amount > 0;
			} else if (type === "expenses") {
				return record.amount < 0;
			}
			return false;
		});
	}

	const labels = filteredData?.map((record) => sliceString(record.title, 30));
	const data = filteredData?.map((record) => Math.abs(record.amount));

	return {
		labels,
		data,
	};
};

export const getOneAreaChartData = (account: Account | string, type: string) => {
	const { labels, data } = getDataByType(account, type);

	return {
		labels,
		datasets: [
			{
				label: "Record amount",
				data,
				backgroundColor: createRandomColorsArray(data?.length),
				borderWidth: 1,
			},
		],
	};
};
