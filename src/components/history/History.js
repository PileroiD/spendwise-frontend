import styled from "styled-components";
import { Link } from "react-router-dom";

import { RecordItem } from "../recordItem/RecordItem";
import { Spinner } from "../spinner/Spinner";
import { NoData } from "../no-data/NoData";

import { ArrowIcon } from "../../icons";

const Wrapper = styled.div`
    text-align: center;
`;

const AllHistory = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    margin-top: 10px;
    text-align: center;
    font-size: 19px;

    &:hover {
        text-decoration: underline;
    }
`;

const HistoryContainer = ({ className, records, isLoading }) => {
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className={className}>
            <Wrapper>
                {records?.length ? (
                    <>
                        <div>
                            {records.slice(0, 5).map((record, index) => (
                                <Link to={`/record/${record.id}`} key={index}>
                                    <RecordItem
                                        item={record}
                                        type={record.type}
                                    />
                                </Link>
                            ))}
                        </div>
                        <AllHistory to="/history">
                            All history
                            <ArrowIcon />
                        </AllHistory>
                    </>
                ) : (
                    <NoData
                        mainText="No Data"
                        emptyText={`To view your history, you must add at least one record`}
                    />
                )}
            </Wrapper>
        </section>
    );
};

export const History = styled(HistoryContainer)``;
