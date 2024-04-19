import styled from "styled-components";

const IconComponentContainer = ({ className, children, ...props }) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

export const IconComponent = styled(IconComponentContainer)`
    cursor: pointer;
    transition: 0.2s all;

    &:hover {
        transform: translateY(-3px);
    }
`;
