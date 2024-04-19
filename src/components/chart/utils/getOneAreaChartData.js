import { sliceString } from "../../../utils/sliceString";
import { createRandomColorsArray } from "./createRandomColorsArray";

const getDataByType = (account, type) => {
    const filteredData = account.records.filter((record) => {
        if (type === "incomes") {
            return record.amount > 0;
        } else if (type === "expenses") {
            return record.amount < 0;
        }
        return false;
    });

    const labels = filteredData.map((record) => sliceString(record.title, 30));
    const data = filteredData.map((record) => Math.abs(record.amount));

    return {
        labels,
        data,
    };
};

export const getOneAreaChartData = (account, type) => {
    const { labels, data } = getDataByType(account, type);

    return {
        labels,
        datasets: [
            {
                label: "Record amount",
                data,
                backgroundColor: createRandomColorsArray(data.length),
                borderWidth: 1,
            },
        ],
    };
};
