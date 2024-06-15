import styled from "styled-components";
import { useContext } from "react";

import { ThemeContext } from "../../context";
import sunIcon from "../../icons/sun.icon";
import moonIcon from "../../icons/moon.icon";

interface ThemeComponentProps {
	className?: string;
}

const ThemeContainer: React.FC<ThemeComponentProps> = ({ className }) => {
	const context = useContext(ThemeContext);

	return (
		<div className={className}>
			<div className="theme-icon" onClick={context.toggleTheme}>
				{context.theme === "light" ? moonIcon : sunIcon}
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
