import { Component } from "react";
import img from "./error.gif";

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    componentDidCatch(error, errorInfo) {
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
