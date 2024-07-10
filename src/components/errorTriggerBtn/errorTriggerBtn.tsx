import React, { Component } from 'react';

interface ErrorTriggerState {
  throwError: boolean;
}

export default class ErrorTrigger extends Component<
  unknown,
  ErrorTriggerState
> {
  isMounted: boolean = false;

  constructor(props: unknown) {
    super(props);
    this.state = {
      throwError: false
    };

    this.triggerError = this.triggerError.bind(this);
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  triggerError() {
    if (this.isMounted) {
      this.setState({ throwError: true });
    }
  }

  render() {
    if (this.state.throwError) {
      throw new Error('Intentional Error');
    }

    return (
      <button className="error-btn" onClick={this.triggerError}>
        Click to trigger error
      </button>
    );
  }
}
