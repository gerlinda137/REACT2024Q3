import React from 'react';
import SearchInput from '../../components/searchInput/searchInput';
import './_main.scss';

export default class MainPage extends React.Component {
  render() {
    return (
      <section className="main-page">
        <SearchInput
          className="search-input"
          placeholder="Enter your search term..."
        />
      </section>
    );
  }
}
