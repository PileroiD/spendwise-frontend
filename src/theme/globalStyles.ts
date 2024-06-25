import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle<{ theme?: any }>`
    body {
        background: ${({ theme }) => theme.body} !important;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.50s linear !important;
    }
`;
