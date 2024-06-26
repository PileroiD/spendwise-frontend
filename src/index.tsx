import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import { ThemeProviderComponent } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<BrowserRouter>
		<ThemeProviderComponent>
			<Provider store={store}>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</Provider>
		</ThemeProviderComponent>
	</BrowserRouter>
);
