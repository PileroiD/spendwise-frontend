import styled from "styled-components";

import sunIcon from "../../icons/sun.icon";
import moonIcon from "../../icons/moon.icon";
import { useTheme } from "../../context";

interface ThemeComponentProps {
	className?: string;
}

const ThemeContainer: React.FC<ThemeComponentProps> = ({ className }) => {
	const context = useTheme();

	return (
		<div className={className}>
			<div className="theme-icon" onClick={context?.toggleTheme}>
				{context?.theme.background === "#363537" ? moonIcon : sunIcon}
			</div>
		</div>
	);
};

export const ThemeComponent = styled(ThemeContainer)<ThemeComponentProps>`
	.theme-icon {
		margin-right: 20px;
		cursor: pointer;
	}
`;
