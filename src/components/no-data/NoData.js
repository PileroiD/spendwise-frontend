import styled from "styled-components";

const MainText = styled.div`
    font-size: 30px;
    color: #808080;
    margin-top: 50px;
`;

const EmptyText = styled.div`
    color: #808080;
`;

const NoDataContainer = ({ className, mainText, emptyText }) => {
    return (
        <div className={className}>
            <MainText>{mainText}</MainText>
            <EmptyText>{emptyText}</EmptyText>
        </div>
    );
};

export const NoData = styled(NoDataContainer)`
    text-align: center;
`;
