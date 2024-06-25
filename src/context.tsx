import React, { createContext, useState, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, ThemeType } from "./theme/themes";
import { GlobalStyles } from "./theme/globalStyles";

type InitialContextType = {
	toggleTheme: () => void;
	theme: ThemeType;
};

const ThemeToggleContext = createContext<InitialContextType | undefined>(undefined);

export const useTheme = () => useContext(ThemeToggleContext);

export const ThemeProviderComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeType>(lightTheme);

	const toggleTheme = (): void => {
		setTheme(theme === lightTheme ? darkTheme : lightTheme);
	};

	return (
		<ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				{children}
			</ThemeProvider>
		</ThemeToggleContext.Provider>
	);
};
