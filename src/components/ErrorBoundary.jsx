import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Replace this with your production error-monitoring service.
    console.error("Page rendering failed", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" className="content-page">
          <h1>Something went wrong</h1>
          <p>Try returning home or reloading the page.</p>
          <a href="/">Go to home</a>
        </main>
      );
    }

    return this.props.children;
  }
}