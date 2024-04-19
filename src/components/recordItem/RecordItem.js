import styled from "styled-components";
import { useMatch } from "react-router-dom";

import { Icon, Name, Amount, Category, Date, Info, Descr } from "./styles";
import { sliceString, getProperDate } from "../../utils";

const RecordItemContainer = ({ className, item }) => {
    const isMainPage = useMatch("/");

    return (
        <div className={className}>
            <Icon src={item.imageUrl} alt="icon" />
            <div className="info-wrapper">
                <Info>
                    <Name>{sliceString(item.title, 35)}</Name>
                    <Amount type={item.type || "Accounts"}>
                        {item.amount ? item.amount + " $" : null}
                    </Amount>
                </Info>

                {isMainPage ? null : (
                    <Descr>{sliceString(item.description, 80)}</Descr>
                )}

                <Info>
                    <Category>{item.accountName}</Category>
                    <Date>{getProperDate(item.createdAt)}</Date>
                </Info>
            </div>
        </div>
    );
};

export const RecordItem = styled(RecordItemContainer)`
    position: relative;
    margin-top: 7px;
    display: grid;
    align-items: center;
    grid-template-columns: 30px auto;
    column-gap: 10px;
    border: 1px solid #000;
    padding: 4px;
    border-radius: 3px;
    transition: 0.2s all;
    cursor: ${({ type }) => (type === "Accounts" ? "auto" : "pointer")};

    ${({ type }) =>
        type === "Accounts"
            ? ""
            : `&:hover {
        transform: translateY(-1px);
        box-shadow: 0px 0px 3px #000;
    }`};
`;
