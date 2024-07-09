import React from 'react';
// import Popup from '../components/popups/popup';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false // Initialize state with hasError set to false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  handleClosePopup = () => {
    this.setState({ hasError: false }); // Reset hasError to false
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // If an error has occurred, render the Popup component
      // return (
      //   // <Popup
      //   //   title="An Error Occurred"
      //   //   message="Something went wrong. Please try again later."
      //   //   isShown={true}
      //   //   onClose={this.handleClosePopup}
      //   // />
      // );
    }

    // If no error has occurred, render the children components
    return this.props.children;
  }
}
