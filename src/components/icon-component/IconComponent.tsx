import styled from "styled-components";

interface IconProps {
	className?: string;
	children: React.ReactNode;
}

const IconComponentContainer: React.FC<IconProps> = ({ className, children, ...props }) => {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
};

export const IconComponent = styled(IconComponentContainer)<IconProps>`
	cursor: pointer;
	transition: 0.2s all;

	&:hover {
		transform: translateY(-3px);
	}
`;
