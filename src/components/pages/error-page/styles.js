import { Link } from "react-router-dom";
import styled from "styled-components";

export const Title = styled.div`
    font-size: 80px;
    text-align: center;
    font-weight: 900;
    margin-top: 250px;
`;

export const SubTitle = styled.div`
    text-align: center;
    font-size: 30px;
    color: #808080;
`;

export const Description = SubTitle;

export const MainLink = styled(Link)`
    display: block;
    margin-top: 20px;
    text-align: center;
    color: green;
    text-decoration: underline;
`;
