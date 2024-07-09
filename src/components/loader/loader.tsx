import { Component } from 'react';
import './loader.scss';

interface LoaderProps {
  text?: string;
  isLoading: boolean;
}

interface LoaderState {
  isLoading: boolean;
}

export default class SearchLoader extends Component<LoaderProps, LoaderState> {
  static defaultProps = {
    text: 'LOADING...'
  };

  constructor(props: LoaderProps) {
    super(props);
    this.state = {
      isLoading: props.isLoading
    };
  }

  componentDidUpdate(prevProps: LoaderProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }
  }

  render() {
    const { text } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
          <p>{text}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
