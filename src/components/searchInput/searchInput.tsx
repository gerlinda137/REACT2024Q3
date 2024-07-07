import { Component } from 'react';
import './searchInput.scss';

interface SearchProps {
  className: string;
  placeholder: string;
}

interface SearchState {
  searchTerm: string;
}

export default class SearchInput extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { className, placeholder } = this.props;
    const { searchTerm } = this.state;

    return (
      <section className={className}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={this.handleSearchChange}
        />
        <button onClick={() => console.log('Searching for:', searchTerm)}>
          Search
        </button>
      </section>
    );
  }
}
