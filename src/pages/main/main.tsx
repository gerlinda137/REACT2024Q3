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

  async handleSearch(query: string) {
    const results = await searchShows(query);
    this.searchInput.current!.setResults(results);
    this.setState({ results });
    console.log(results);
    return results;
  }

  async getInitialResults() {
    const query = localStorage.getItem('query');
    if (query) {
      const results = await this.handleSearch(query);
      this.setState({ results });
    }
  }

  componentDidMount() {
    this.getInitialResults();
  }

  render() {
    const results = this.state.results;
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
              {results.map((result) => (
                <Card
                  key={result.show.id}
                  title={result.show.name}
                  description={result.show.summary}
                  image={result.show.image?.original}
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
