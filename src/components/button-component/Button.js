import styled from "styled-components";

const ButtonContainer = ({ children, className, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    width: ${({ width }) => (width ? width : "80px")};
    height: ${({ height }) => (height ? height : "27px")};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s all;
    font-size: 15px;
    background: ${({ current }) => (current === "true" ? "lightgray" : "#fff")};

    &:hover {
        transform: translateY(-3px);
        box-shadow: 1px 2px 6px #000;
    }
`;
