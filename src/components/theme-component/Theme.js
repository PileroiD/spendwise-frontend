import styled from "styled-components";
import { useContext } from "react";

import { ThemeContext } from "../../context";
import sunIcon from "../../icons/sun.icon";
import moonIcon from "../../icons/moon.icon";

const ThemeContainer = ({ className }) => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div className={className}>
			<div className="theme-icon" onClick={toggleTheme}>
				{theme === "light" ? moonIcon : sunIcon}
			</div>
		</div>
	);
};

export const ThemeComponent = styled(ThemeContainer)`
	.theme-icon {
		margin-right: 20px;
		cursor: pointer;
	}
`;
