import { useMatch } from "react-router-dom";

export interface DefineRecords {
	initialRequestURL: string;
	searchRequestURL: string;
}

export const useDefineRecordsURL = (
	searchValue: string,
	page: number,
	limit: number
): DefineRecords => {
	const isExpenses: boolean = useMatch("/expenses") !== null;
	const isAllHistory: boolean = useMatch("/history") !== null;

	let initialRequestURL = `/records?type=Incomes&limit=${limit}&page=${page}`;
	let searchRequestURL = `/records?search=${searchValue}&type=Incomes&limit=${limit}&page=${page}`;

	if (isExpenses) {
		initialRequestURL = `/records?type=Expenses&limit=${limit}&page=${page}`;
		searchRequestURL = `/records?search=${searchValue}&type=Expenses&limit=${limit}&page=${page}`;
	} else if (isAllHistory) {
		initialRequestURL = `/records?limit=${limit}&page=${page}`;
		searchRequestURL = `/records?search=${searchValue}&limit=${limit}&page=${page}`;
	}

	return { initialRequestURL, searchRequestURL };
};
