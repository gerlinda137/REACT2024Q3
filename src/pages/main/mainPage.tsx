import React from 'react';
import Card from '../../components/card/card';
import ErrorTrigger from '../../components/errorTriggerBtn/errorTriggerBtn';
import SearchLoader from '../../components/loader/loader';
import SearchInput from '../../components/searchInput/searchInput';
import { SearchResult, searchShows } from '../../api/apiHandler';
import './_mainPage.scss';

interface MainPageState {
  results: SearchResult[];
  loading: boolean;
}
export default class MainPage extends React.Component<unknown, MainPageState> {
  searchInput: React.RefObject<SearchInput>;

  constructor(props: unknown) {
    super(props);
    this.searchInput = React.createRef();
    this.state = {
      results: [],
      loading: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.getInitialResults = this.getInitialResults.bind(this);
  }

  async handleSearch(query: string) {
    this.setState({ loading: true });
    const results = await searchShows(query);
    this.searchInput.current!.setResults(results);
    this.setState({ results, loading: false });
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
    const { results, loading } = this.state;
    return (
      <section className="main-page">
        <ErrorTrigger />
        <SearchInput
          className="search-input"
          placeholder="Enter your search term..."
          handleSearch={(r) => this.handleSearch(r)}
          ref={this.searchInput}
        />
        <section className="results">
          {loading ? (
            <SearchLoader isLoading={loading} text="Loading..." />
          ) : results.length > 0 ? (
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
