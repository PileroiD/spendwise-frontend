import styled from "styled-components";

interface InputWrapperProps {
	className?: string;
	children: React.ReactNode;
	width?: string;
}

const InputWrapperContainer: React.FC<InputWrapperProps> = ({ className, children, ...props }) => {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
};

export const InputWrapper = styled(InputWrapperContainer)<InputWrapperProps>`
	position: relative;
	margin-bottom: 20px;
	& input {
		width: ${({ width }) => (width ? width : "350px")};
		height: 40px;
		border: 1px solid #808080;
		border-radius: 5px;
		padding: 5px;
		font-size: 15px;
	}
	& label {
		position: absolute;
		background: #fff;
		font-size: 14px;
		left: 10px;
		font-weight: 600;
		top: -10px;
		padding: 2px 5px;
	}
	& textarea {
		height: 100px;
		width: 545px;
		border: 1px solid #808080;
		border-radius: 5px;
		padding: 8px 5px;
		font-size: 15px;
		resize: none;
	}
`;
