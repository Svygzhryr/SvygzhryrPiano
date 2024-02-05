import { Component } from "react";
import { ErrorFallback } from "../ErrorFallback";

export default class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorFallback error={error} />;
    }

    return children;
  }
}
