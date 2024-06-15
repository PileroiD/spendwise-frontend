import { createContext, useState } from "react";

export interface ThemeContextType {
	theme: string;
	toggleTheme: () => void;
}

interface ThemeProps {
	children?: React.ReactNode;
}

const initialContext: ThemeContextType = {
	theme: "light",
	toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialContext);

export const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
	const [theme, setTheme] = useState<string>("light");

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
