import styled from "styled-components";
import { useEffect, useState } from "react";

export const Pages = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    margin: 0 10px;
`;

const PaginationContainer = ({ className, page, lastPage, setCurrentPage }) => {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        const buttons = [];

        for (let i = 1; i < lastPage + 1; i++) {
            buttons.push(
                <div
                    key={i}
                    className={`${i === page ? "current-page" : "page"}`}
                >
                    {i}
                </div>
            );
        }

        setButtons(buttons);
    }, [page, lastPage]);

    return (
        <div className={className}>
            <button onClick={() => setCurrentPage(1)} disabled={page === 1}>
                Start
            </button>
            <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            <Pages>{buttons && buttons.map((btn) => btn)}</Pages>

            <button
                disabled={page === lastPage}
                onClick={() => setCurrentPage((prev) => prev + 1)}
            >
                Next
            </button>
            <button
                onClick={() => setCurrentPage(lastPage)}
                disabled={page === lastPage}
            >
                End
            </button>
        </div>
    );
};

export const Pagination = styled(PaginationContainer)`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    column-gap: 8px;
    align-items: center;

    & button {
        height: 25px;
        width: 45px;
    }

    & .current-page {
        font-size: 19px;
        font-weight: 600;
        color: #000;
        text-decoration: underline;
    }

    & .page {
        font-size: 15px;
        font-weight: 300;
        color: #808080;
    }
`;
