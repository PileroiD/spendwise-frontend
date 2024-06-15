import styled from "styled-components";

export const Title = styled.h2`
    margin-bottom: 10px;
`;

export const RecordsControls = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 410px);
    margin: 20px 0;
    justify-content: center;
`;

export const Accounts = styled.div`
    display: grid;
    grid-template-columns: 70px 210px;
    align-items: center;
    column-gap: 5px;
`;

export const SortPanel = styled.div`
    display: grid;
    grid-template-columns: auto 210px;
    align-items: center;
    column-gap: 5px;
    justify-self: end;
`;

export const Record = styled.div`
    display: grid;
    column-gap: 10px;
    grid-template-columns: auto 20px;
    align-items: center;
`;

export const Controls = styled.div`
    transform: translateY(4px);
    display: flex;
    column-gap: 7px;
`;

export const Search = styled.div`
    justify-self: center;

    & form {
        display: flex;
        align-items: center;
        column-gap: 5px;
        justify-self: center;
    }

    & input {
        width: 290px;
        height: 38px;
        padding: 5px;
        border: 1px solid gray;
        border-radius: 5px;
    }
`;

export const SearchBtn = styled.button`
    background: #fff;
    border: none;
    cursor: pointer;
    transition: 0.2s all;

    & :hover {
        transform: translateY(-2px);
        transition: 0.2s all;
    }
`;

export const ShowAll = styled.div`
    text-align: center;
    color: green;
    text-decoration: underline;
    cursor: pointer;
`;

export const Limit = styled.div`
    display: flex;
    column-gap: 5px;
`;
