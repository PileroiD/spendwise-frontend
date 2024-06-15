import styled from "styled-components";

export const Title = styled.div`
    text-align: center;
    font-style: italic;
    font-family: "Playfair Display", serif;
    font-size: 60px;
    margin-top: 100px;
`;

export const Description = styled.div`
    width: 910px;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
`;

export const Feature = styled.div`
    font-weight: 600;
`;

export const FeatureItem = styled.div`
    padding-left: 10px;
    font-size: 16px;
`;

export const RegDescr = styled.div`
    width: 910px;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    color: lightcoral;

    & a {
        text-decoration: underline;
        color: lightcoral;
    }
`;

export const PurpleCircle = styled.div`
    left: 80px;
    width: 300px;
    height: 300px;
    position: absolute;
    top: 200px;
    background: #f4cccc;
    border-radius: 100%;
    z-index: -1;
`;

export const PinkCircle = styled.div`
    width: 220px;
    height: 220px;
    position: absolute;
    top: 430px;
    right: 300px;
    background: #ead1dc;
    border-radius: 100%;
    z-index: -1;
`;

export const BlueCircle = styled.div`
    width: 180px;
    height: 180px;
    position: absolute;
    top: 0;
    right: 440px;
    background: #c9daf8;
    border-radius: 100%;
    z-index: -1;
`;
