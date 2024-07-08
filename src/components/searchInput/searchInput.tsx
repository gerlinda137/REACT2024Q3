import { ChangeEvent, Component } from 'react';
import { SearchResult } from '../../utils/apiHandler';
import './searchInput.scss';

interface SearchProps {
  className: string;
  placeholder: string;
  handleSearch: (query: string) => void;
}

interface SearchState {
  query: string;
  results: SearchResult[];
}

export default class SearchInput extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
  }

  public setResults(results: SearchResult[]) {
    this.setState({ results });
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearchSubmit = () => {
    const { query } = this.state;
    this.props.handleSearch(query);
    localStorage.setItem('query', query);
  };

  render() {
    const { className, placeholder } = this.props;
    const { query } = this.state;

    return (
      <section className={className}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={this.handleSearchChange}
        />
        <button onClick={this.handleSearchSubmit}>Search</button>
      </section>
    );
  }
}
