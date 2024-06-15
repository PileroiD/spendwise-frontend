import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../store";

import { CreatedAt, Wrapper, Icon, SaveButton } from "./styles";
import { RecordInfo } from "../record-info/RecordInfo";
import { Spinner } from "../../spinner/Spinner";
import { getFullDate } from "./utils/getFullDate";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";
import { AccountName, selectAccountNames } from "../../../selectors";

import { request, correctAmount } from "../../../utils";
import { updateAccounts } from "../../../actions";
import { Record } from "../../../types/types";

interface RecordResponse {
	record: Record | null;
	error: string | null;
}

const RecordDetailsContainer: React.FC<{ className?: string }> = ({ className }) => {
	const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
	const accountNames: AccountName[] = useSelector(selectAccountNames);
	const [serverError, setServerError] = useState<boolean>(false);

	const [record, setRecord] = useState<Record | null>(null);

	const [titleValue, setTitleValue] = useState<string>("");
	const titleRef = useRef<HTMLDivElement>(null);

	const [account, setAccount] = useState<string>("");
	const accountRef = useRef<HTMLDivElement>(null);

	const [amountValue, setAmountValue] = useState<string>("");
	const amountRef = useRef<HTMLDivElement>(null);

	const [type, setType] = useState<string>("");
	const typeRef = useRef<HTMLDivElement>(null);

	const [descr, setDescr] = useState<string>("");
	const descrRef = useRef<HTMLDivElement>(null);

	const [iconUrl, setIconUrl] = useState<string>("");
	const iconRef = useRef<HTMLDivElement>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
	const { id } = useParams();

	useEffect(() => {
		document.title = `Record: ${record?.title}`;
	}, [record]);

	useEffect(() => {
		setIsLoading(true);
		request(`/records/${id}`, "GET").then(({ error, record }: RecordResponse) => {
			if (error) {
				console.log("error :>> ", error);
				setServerError(true);
				return;
			}

			if (record) {
				setRecord(record);
				setIsLoading(false);
				setAccount(record.accountName);
				setType(record.type);
			}
		});
	}, [id, shouldUpdate]);

	const onSubmit = () => {
		let properAmount;
		if (record) {
			properAmount = correctAmount(type || record.type, amountValue || record.amount);
		}

		const data = {
			title: titleValue || record?.title,
			account_name: account || record?.accountName,
			account_id: accountNames.find((acc) => acc.accountName === account)?.accountId,
			amount: properAmount,
			type: type || record?.type,
			description: descr || record?.description,
			image_url: iconUrl || record?.imageUrl,
		};

		request(`/records/${id}`, "PATCH", data).then(({ error, record }: RecordResponse) => {
			if (error) return;

			setRecord(record);
			setShouldUpdate((prev) => !prev);

			dispatch(updateAccounts());
		});
	};

	const isDisabled = useMemo(() => {
		if (
			titleValue ||
			(account && account !== record?.accountName) ||
			amountValue ||
			(type && type !== record?.type) ||
			descr ||
			iconUrl
		) {
			return false;
		}
		return true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [titleValue, account, amountValue, type, descr, iconUrl]);

	if (serverError) {
		return <Navigate to="/error-page" />;
	}

	return (
		<section className={className}>
			<ErrorBoundary>
				{isLoading ? (
					<Spinner />
				) : (
					record && (
						<>
							<h2>Record details:</h2>

							<CreatedAt>{getFullDate(record.createdAt)}</CreatedAt>

							<Wrapper>
								<RecordInfo
									label="Title"
									value={record.title}
									isInput={true}
									inputValue={titleValue}
									setInputValue={setTitleValue}
									mainRef={titleRef}
									type="input"
								/>

								<RecordInfo
									label="Account"
									value={record.accountName}
									isInput={false}
									inputValue={account}
									setInputValue={setAccount}
									mainRef={accountRef}
									type="select"
								/>

								<RecordInfo
									label="Amount"
									value={`${record.amount} $`}
									isInput={true}
									inputValue={amountValue}
									setInputValue={setAmountValue}
									mainRef={amountRef}
									type="input"
								/>

								<RecordInfo
									label="Type"
									value={record.type}
									isInput={false}
									inputValue={type}
									setInputValue={setType}
									mainRef={typeRef}
									type="select"
								/>
							</Wrapper>

							<RecordInfo
								label="Description"
								value={record.description}
								isInput={true}
								inputValue={descr}
								setInputValue={setDescr}
								mainRef={descrRef}
								type="textarea"
							/>

							<RecordInfo
								label="Icon"
								value={<Icon src={record.imageUrl} alt={record.title} />}
								isInput={true}
								inputValue={iconUrl}
								setInputValue={setIconUrl}
								mainRef={iconRef}
								type="input"
							/>

							<SaveButton onClick={onSubmit} disabled={isDisabled}>
								Save
							</SaveButton>
						</>
					)
				)}
			</ErrorBoundary>
		</section>
	);
};

const RecordDetails = styled(RecordDetailsContainer)`
	padding: 50px 20px;

	& .spinner {
		display: block;
		margin: 0 auto;
		margin-top: 100px;
	}

	& .input,
	.select {
		display: none;
		column-gap: 5px;
		align-items: center;

		input {
			height: 25px;
			width: 200px;
			padding: 4px;
		}

		& .close {
			font-size: 20px;
			cursor: pointer;
		}

		& textarea {
			width: 610px;
			height: 100px;
			padding: 5px;
			resize: none;
		}
	}

	& .items-wrapper {
		display: flex;
		column-gap: 10px;
	}

	& .items-info {
		padding: 10px;
	}
`;

export default RecordDetails;
