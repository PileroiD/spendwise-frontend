import styled from "styled-components";

interface SelectorWrapperContainerProps {
	className?: string;
	children: React.ReactNode;
	marginbottom?: string;
}

const SelectorWrapperContainer: React.FC<SelectorWrapperContainerProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
};

export const SelectorWrapper = styled(SelectorWrapperContainer)<SelectorWrapperContainerProps>`
	width: 200px;
	margin: 0 0 ${({ marginbottom }) => (marginbottom ? marginbottom : "15px")} 20px;

	& .label {
		transform: translateX(-19px);
		font-weight: 600;
	}
`;
