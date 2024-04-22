import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser, setAccounts } from "./actions";
import { request } from "./utils";
import { selectUserId } from "./selectors";
import { initialUserState } from "./reducers";
import { Spinner } from "./components/spinner/Spinner";

import RecordDetails from "./components/pages/record-details/RecordDetails";

const Header = lazy(() => import("./components/header/Header"));
const SideWindow = lazy(() => import("./components/side-window/SideWindow"));
const Main = lazy(() => import("./components/pages/main/Main"));
const Register = lazy(() => import("./components/pages/auth/Register"));
const Login = lazy(() => import("./components/pages/auth/Login"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Records = lazy(() => import("./components/pages/records/Records"));
const RecordCreator = lazy(() =>
    import("./components/pages/record-creator/RecordCreator")
);
const AccountCreator = lazy(() =>
    import("./components/pages/account-creator/AccountCreator")
);
const Accounts = lazy(() => import("./components/pages/accounts/Accounts"));
const ErrorPage = lazy(() => import("./components/pages/error-page/ErrorPage"));

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1280px;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
`;

const Page = styled.main`
    padding-top: 70px;

    .spinner {
        display: block;
        margin: 0 auto;
    }
`;

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectUserId);

    useEffect(() => {
        const user = sessionStorage.getItem("user");

        if (!user) {
            dispatch(setUser(initialUserState));
            return;
        }

        dispatch(setUser(JSON.parse(user)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            request("/accounts?records=true", "GET").then((response) => {
                if (!response.error) {
                    dispatch(setAccounts(response.accounts));
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <AppContainer>
            <SideWindow />
            <Header />

            <Page>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                        <Route path="/incomes" element={<Records />} />
                        <Route
                            path="/add-incomes"
                            element={<RecordCreator />}
                        />

                        <Route path="/record/:id" element={<RecordDetails />} />

                        <Route path="/expenses" element={<Records />} />
                        <Route
                            path="/add-expenses"
                            element={<RecordCreator />}
                        />

                        <Route
                            path="/add-accounts"
                            element={<AccountCreator />}
                        />
                        <Route path="/accounts" element={<Accounts />} />

                        <Route path="/history" element={<Records />} />

                        <Route path="/error-page" element={<ErrorPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Suspense>
            </Page>

            <Footer />
        </AppContainer>
    );
}

export default App;
