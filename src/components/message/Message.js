import styled from "styled-components";

const MessageContainer = ({ className, text }) => {
    return <div className={className}>{text}</div>;
};

export const Message = styled(MessageContainer)`
    position: absolute;
    background-color: lightgreen;
    padding: 20px;
    border-radius: 10px;
    left: 50%;
    top: -100px;
    transform: translateX(-50%);
    animation-name: show-message;
    animation-duration: 3s;
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);

    @keyframes show-message {
        0% {
            top: -50px;
            opacity: 0;
        }
        25% {
            top: 50px;
            opacity: 1;
        }
        75% {
            top: 50px;
            opacity: 1;
        }
        100% {
            top: -50px;
            opacity: 0;
        }
    }
`;
