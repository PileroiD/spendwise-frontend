import { Component, ErrorInfo } from "react";
import img from "./error.gif";

interface ErrorBoundaryState {
	error: boolean;
}

interface ErrorBoundaryProps {
	children?: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state = {
		error: false,
	};

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error: true,
		});
	}

	render() {
		if (this.state.error) {
			return (
				<img
					style={{
						display: "block",
						width: "150px",
						height: "150px",
						objectFit: "contain",
						margin: "0 auto",
					}}
					src={img}
					alt="error"
				/>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
