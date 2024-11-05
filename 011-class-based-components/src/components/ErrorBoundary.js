import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    // We don't need to set state but we can since this is a regular component
    this.state = { hasError: false };
  }

  // Any component which has this method is an error boundary component
  // We can get error as parameter which we can use to handle error
  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
