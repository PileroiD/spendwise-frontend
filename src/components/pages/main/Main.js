import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Window } from "../../window/Window";
import { ChartComponent } from "../../chart/Chart";
import { WelcomeBanner } from "../../welcomeBanner/WelcomeBanner";
import { History } from "../../history/History";
import { Spinner } from "../../spinner/Spinner";
import { NoData } from "../../no-data/NoData";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

import { selectUserId, selectAccounts } from "../../../selectors";
import { request } from "../../../utils";

const Windows = styled.section`
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(3, 380px);
    grid-template-rows: 300px;
`;

const HistoryTitle = styled.h2`
    margin-top: 30px;
`;

const MainPageContainer = ({ className }) => {
    const accounts = useSelector(selectAccounts);
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [lastRecords, setRecords] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = useSelector(selectUserId);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [incomesRes, expensesRes, recordsRes] = await Promise.all([
                request("/records?type=Incomes&limit=4", "GET"),
                request("/records?type=Expenses&limit=4", "GET"),
                request("/records?limit=5", "GET"),
            ]);

            if (!incomesRes.error) setIncomes(incomesRes.records);
            if (!expensesRes.error) setExpenses(expensesRes.records);
            if (!recordsRes.error) setRecords(recordsRes.records);

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        document.title = "SpendWise";
    }, []);

    return (
        <section className={className}>
            {isAuthenticated ? (
                <>
                    <ErrorBoundary>
                        <Windows>
                            <Window
                                title="Incomes"
                                items={incomes}
                                isLoading={isLoading}
                            />
                            <Window
                                title="Accounts"
                                items={accounts}
                                isLoading={isLoading}
                            />
                            <Window
                                title="Expenses"
                                items={expenses}
                                isLoading={isLoading}
                            />
                        </Windows>
                    </ErrorBoundary>

                    <hr />

                    <ErrorBoundary>
                        {isLoading ? (
                            <Spinner />
                        ) : accounts.length > 0 ? (
                            <ChartComponent accounts={accounts} />
                        ) : (
                            <NoData
                                mainText="No Data"
                                emptyText="You need to add an account to see the charts"
                            />
                        )}
                    </ErrorBoundary>

                    <hr />

                    <HistoryTitle>Last 5 records: </HistoryTitle>

                    <ErrorBoundary>
                        <History records={lastRecords} isLoading={isLoading} />
                    </ErrorBoundary>
                </>
            ) : (
                <WelcomeBanner />
            )}
        </section>
    );
};

const Main = styled(MainPageContainer)`
    margin-top: 40px;
    padding: 0 20px;
    margin-bottom: 50px;

    & hr {
        margin: 30px;
    }
`;

export default Main;
