import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CreatedAt, Wrapper, Icon, SaveButton } from "./styles";
import { RecordInfo } from "../record-info/RecordInfo";
import { Spinner } from "../../spinner/Spinner";
import { getFullDate } from "./utils/getFullDate";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

import { request, correctAmount } from "../../../utils";
import { updateAccounts } from "../../../actions";
import { selectAccountNames } from "../../../selectors";

const RecordDetailsContainer = ({ className }) => {
    const dispatch = useDispatch();
    const accountNames = useSelector(selectAccountNames);
    const [serverError, setServerError] = useState(false);

    const [record, setRecord] = useState(null);

    const [titleValue, setTitleValue] = useState("");
    const titleRef = useRef();

    const [account, setAccount] = useState("");
    const accountRef = useRef();

    const [amountValue, setAmountValue] = useState("");
    const amountRef = useRef();

    const [type, setType] = useState("");
    const typeRef = useRef();

    const [descr, setDescr] = useState("");
    const descrRef = useRef();

    const [iconUrl, setIconUrl] = useState("");
    const iconRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        document.title = `Record: ${record?.title}`;
    }, [record]);

    useEffect(() => {
        setIsLoading(true);
        request(`/records/${id}`, "GET").then(({ error, record }) => {
            if (error) {
                console.log("error :>> ", error);
                setServerError(true);
                return;
            }

            setRecord(record);
            setIsLoading(false);
            setAccount(record.accountName);
            setType(record.type);
        });
    }, [id, shouldUpdate]);

    const onSubmit = () => {
        const properAmount = correctAmount(
            type || record.type,
            amountValue || record.amount
        );

        const data = {
            title: titleValue || record.title,
            account_name: account || record.accountName,
            account_id: accountNames.find((acc) => acc.accountName === account)
                .accountId,
            amount: properAmount,
            type: type || record.type,
            description: descr || record.description,
            image_url: iconUrl || record.imageUrl,
        };

        request(`/records/${id}`, "PATCH", data).then(({ error, record }) => {
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

                            <CreatedAt>
                                {getFullDate(record.createdAt)}
                            </CreatedAt>

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
                                value={
                                    <Icon
                                        src={record.imageUrl}
                                        alt={record.title}
                                    />
                                }
                                isInput={true}
                                inputValue={iconUrl}
                                setInputValue={setIconUrl}
                                mainRef={iconRef}
                                type="input"
                            />

                            <SaveButton
                                onClick={onSubmit}
                                disabled={isDisabled}
                            >
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
