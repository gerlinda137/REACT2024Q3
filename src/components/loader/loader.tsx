import React, { Component } from 'react';
import './loader.scss';

interface LoaderState {
  isLoading: boolean;
}

export default class SearchLoader extends Component<unknown, LoaderState> {
  constructor(props: unknown) {
    //todo: rebuild in a normal way
    super(props);
    this.state = {
      isLoading: false
    };
  }
  render() {
    const { isLoading } = this.state;
    return (
      <div className={`loader-container`}>
        <div className="loader"></div>
        <p>{isLoading ? 'Loading...' : 'Loaded'}</p>
      </div>
    );
  }
}
