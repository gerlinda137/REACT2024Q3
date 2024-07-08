import React from 'react';
import Card from '../../components/card/card';
import SearchInput from '../../components/searchInput/searchInput';
import { SearchResult, searchShows } from '../../utils/apiHandler';
import './_main.scss';

interface MainPageState {
  results: SearchResult[];
}
export default class MainPage extends React.Component<unknown, MainPageState> {
  searchInput: React.RefObject<SearchInput>;

  constructor(props: unknown) {
    super(props);
    this.searchInput = React.createRef();
    this.state = {
      results: []
    };
    // this.handleSearch = this.handleSearch.bind(this);
  }

  async getInitialResults() {
    const query = localStorage.getItem('query');
    if (query) {
      const results = await this.handleSearch(query);
      this.setState({ results });
    }
  }

  async handleSearch(query: string) {
    const results = await searchShows(query);
    this.searchInput.current!.setResults(results);
    this.setState({ results });
    console.log(results);
    return results;
  }

  render() {
    const results = this.state.results;
    this.getInitialResults();
    return (
      <section className="main-page">
        <SearchInput
          className="search-input"
          placeholder="Enter your search term..."
          handleSearch={(r) => this.handleSearch(r)}
          ref={this.searchInput}
        />
        <section className="results">
          {results.length > 0 ? (
            <div className="card-container">
              {results.map((result, index) => (
                <Card
                  key={index}
                  title={result.show.name}
                  description={result.show.summary}
                  // image={result.show.image.medium}
                  className="result-card"
                />
              ))}
            </div>
          ) : (
            <p>No results found</p>
          )}
        </section>
      </section>
    );
  }
}
