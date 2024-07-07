import { ChangeEvent, Component } from 'react';
import { searchShows } from '../../utils/apiHandler';
import SearchLoader from '../loader/loader';
import './searchInput.scss';

interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  } | null;
  webChannel: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    } | null;
    officialSite: string | null;
  } | null;
  dvdCountry: string | null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
      name: string;
    };
  };
}

interface SearchResult {
  score: number;
  show: Show;
}

interface SearchProps {
  className: string;
  placeholder: string;
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

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearchSubmit = async () => {
    const { query } = this.state;
    const results: SearchResult[] = await searchShows(query);
    console.log(results);
    this.setState({ results });
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
        <button
          onClick={() => {
            <SearchLoader />;
            this.handleSearchSubmit();
          }}
        >
          Search
        </button>
      </section>
    );
  }
}
