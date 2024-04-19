import styled from "styled-components";

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.2s;
    animation-duration: 500ms;
`;

export const List = styled.ul`
    list-style-type: none;
    width: 200px;
`;
