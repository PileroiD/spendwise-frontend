import styled from "styled-components";

export const Icon = styled.img`
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
`;

export const Name = styled.div`
    font-weight: 600;
`;

export const Amount = styled.div`
    color: ${({ type }) =>
        type === "Incomes" ? "green" : type === "Accounts" ? "#000" : "red"};
    font-weight: 700;
`;

export const Category = styled.div`
    font-size: 13px;
`;

export const Date = Category;

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Descr = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 13px;
`;
