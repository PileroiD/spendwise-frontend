import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
	Title,
	RecordsControls,
	Accounts,
	SortPanel,
	Record,
	Controls,
	Search,
	SearchBtn,
	ShowAll,
	Limit,
} from "./styles";

import { RecordItem } from "../../recordItem/RecordItem";
import { IconComponent } from "../../icon-component/IconComponent";
import { Spinner } from "../../spinner/Spinner";
import { NoData } from "../../no-data/NoData";
import { Pagination } from "../../pagination/Pagination";
import { Message } from "../../message/Message";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

import { request } from "../../../utils";
import { AccountName, selectAccountNames } from "../../../selectors";
import { SearchIcon, BinIcon } from "../../../icons";
import { DefineRecords, ShowMessage, useDefineRecordsURL, useShowMessage } from "../../../hooks";
import { updateAccounts } from "../../../actions";
import { RootState } from "../../../store";
import { Record as RecordType, SelectedOption } from "../../../types/types";

interface RecordResponse {
	error: null | string;
	records: RecordType[] | null;
	lastPage?: number;
}

interface RecordDeleteResponse {
	error: null | string;
	success?: boolean;
	record?: null;
}

const RecordsContainer: React.FC<{ className?: string }> = ({ className }) => {
	const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

	const [records, setRecords] = useState<RecordType[]>([]);
	const [initialRecords, setInitialRecords] = useState<RecordType[]>([]);

	const [isLoading, setLoading] = useState<boolean>(false);
	const [account, setAccount] = useState<SelectedOption>(null);
	const [sortMethod, setSortMethod] = useState<SelectedOption>(null);
	const [searchValue, setSearchValue] = useState<string>("");

	const [lastPage, setLastPage] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);

	const accountNames: AccountName[] = useSelector(selectAccountNames);

	const { isMessageVisible, setIsMessageVisible }: ShowMessage = useShowMessage();

	const { initialRequestURL, searchRequestURL }: DefineRecords = useDefineRecordsURL(
		searchValue,
		currentPage,
		limit
	);

	let mainPageTitle: string = "";

	if (initialRequestURL.includes("Incomes")) {
		mainPageTitle = "Incomes: ";
	} else if (initialRequestURL.includes("Expenses")) {
		mainPageTitle = "Expenses: ";
	} else {
		mainPageTitle = "All history: ";
	}

	const sortOptions = [
		{ label: "Date: Newest", value: "Date: Newest" },
		{ label: "Date: Oldest", value: "Date: Oldest" },
		{ label: "Amount: Low to High", value: "Amount: Low to High" },
		{ label: "Amount: High to Low", value: "Amount: High to Low" },
	];

	const sortRecordsByAccounts = (currentAccountName: string): RecordType[] => {
		return initialRecords.filter((record) =>
			currentAccountName === "All" ? true : record.accountName === currentAccountName
		);
	};

	const sortRecordsByMethod = (
		currentSortMethod: SelectedOption,
		records: RecordType[]
	): RecordType[] => {
		switch (currentSortMethod?.value) {
			case "Date: Newest": {
				return records.sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			}
			case "Date: Oldest": {
				return records.sort(
					(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
			}
			case "Amount: Low to High": {
				return records.sort((a, b) => a.amount - b.amount);
			}
			case "Amount: High to Low": {
				return records.sort((a, b) => b.amount - a.amount);
			}
			default:
				return records;
		}
	};

	useEffect(() => {
		document.title = mainPageTitle.slice(0, -2);
	}, [mainPageTitle]);

	useEffect(() => {
		setLoading(true);
		request(initialRequestURL).then(({ error, records, lastPage }: RecordResponse) => {
			if (error) return;

			if (records) {
				setRecords(records);
				setInitialRecords(records);
			}

			if (lastPage) setLastPage(lastPage);

			setAccount(null);
			setSortMethod(null);
			setLoading(false);
		});
	}, [currentPage, limit, initialRequestURL]);

	useEffect(() => {
		const sortedAccounts = sortRecordsByMethod(
			sortMethod,
			sortRecordsByAccounts(account?.label || "All")
		);
		setRecords(sortedAccounts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, sortMethod]);

	const onSearch: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
		e.preventDefault();

		setLoading(true);
		request(searchRequestURL).then(({ error, records, lastPage }: RecordResponse) => {
			if (error) return;

			if (records && lastPage) {
				setRecords(records);
				setLastPage(lastPage);
			}

			setLoading(false);
		});
	};

	const showAll = (): void => {
		setSearchValue("");
		setRecords(initialRecords);
	};

	const deleteRecord = (recordId: string): void => {
		request(`/records/${recordId}`, "DELETE").then(({ error }: RecordDeleteResponse) => {
			if (error) {
				console.error("Failed to delete record");
				return;
			}

			const filterRecords = (recordsArray: RecordType[]) =>
				recordsArray.filter((record) => record.id !== recordId);

			const filteredRecords = filterRecords(records);
			const filteredInitialRecords = filterRecords(initialRecords);

			setRecords(filteredRecords);
			setInitialRecords(filteredInitialRecords);

			dispatch(updateAccounts());
		});
	};

	return (
		<section className={className}>
			<Title>{mainPageTitle}</Title>

			<RecordsControls>
				<Accounts>
					<div className="accounts-title">Accounts: </div>
					<Select
						options={[
							...accountNames.map(({ accountName, accountId }) => ({
								label: accountName,
								value: accountId,
							})),
							{
								label: "All",
								value: "All",
							},
						]}
						placeholder="Choose an account"
						onChange={(selectedOption) => setAccount(selectedOption)}
						value={account}
						isDisabled={!!searchValue.length}
					/>
				</Accounts>
				<Search>
					<form>
						<input
							value={searchValue}
							type="text"
							placeholder="Search record"
							onChange={({ target }) => setSearchValue(target.value)}
						/>
						<SearchBtn type="submit" onClick={onSearch}>
							<IconComponent>
								<SearchIcon />
							</IconComponent>
						</SearchBtn>
					</form>
				</Search>
				<SortPanel>
					<div className="sort-panel-title">Sort by: </div>
					<Select
						options={sortOptions}
						placeholder="Choose sort method"
						onChange={(selectedOption) => setSortMethod(selectedOption)}
						value={sortMethod}
						isDisabled={!!searchValue.length}
					/>
				</SortPanel>
			</RecordsControls>

			<Limit>
				<div className="title-select">Limit: </div>
				<select
					value={limit}
					onChange={({ target }) => {
						setLimit(+target.value);
						setCurrentPage(1);
					}}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
				</select>
			</Limit>

			<ErrorBoundary>
				{!isLoading ? (
					records.length > 0 ? (
						records.map((record) => (
							<Record key={record.id}>
								<Link to={`/record/${record.id}`}>
									<RecordItem
										type={record.type}
										item={record}
										className="record-item"
									/>
								</Link>
								<Controls>
									<IconComponent>
										<div
											className="bin"
											onClick={() => {
												if (!isMessageVisible) {
													deleteRecord(record.id);
													setIsMessageVisible(true);
												}
											}}
										>
											<BinIcon disabled={isMessageVisible} />
										</div>
									</IconComponent>
								</Controls>
							</Record>
						))
					) : (
						<>
							<NoData mainText="No Data" />
							{initialRecords.length > 0 ? (
								<ShowAll onClick={() => showAll()}>Show all</ShowAll>
							) : null}
						</>
					)
				) : (
					<Spinner />
				)}
			</ErrorBoundary>

			{(lastPage as number) > 1 && records.length > 0 && (
				<Pagination
					page={currentPage}
					lastPage={lastPage}
					setCurrentPage={setCurrentPage}
				/>
			)}

			{isMessageVisible && <Message text="You have successfully deleted the record" />}
		</section>
	);
};

const Records = styled(RecordsContainer)`
	padding: 40px 30px;
	position: relative;

	& .spinner {
		display: block;
		margin: 0 auto;
	}
`;

export default Records;
