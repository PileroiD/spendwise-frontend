import styled from "styled-components";

const SelectorWrapperContainer = ({ className, children, ...props }) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

export const SelectorWrapper = styled(SelectorWrapperContainer)`
    width: 200px;
    margin: 0 0 ${({ marginbottom }) => (marginbottom ? marginbottom : "15px")}
        20px;

    & .label {
        transform: translateX(-19px);
        font-weight: 600;
    }
`;
