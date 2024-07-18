import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Result } from '../../interfaces/interfaces';

import './searchInput.scss';

interface SearchProps {
  className: string;
  placeholder: string;
  handleSearch: (query: string) => Promise<Result[]>;
}

export interface SearchInputRef {
  setResults: (results: Result[]) => void;
}

const SearchInput = forwardRef<SearchInputRef, SearchProps>((props, ref) => {
  const { className, placeholder, handleSearch } = props;
  const [query, setQuery] = useState('');
  const [, setSearchParams] = useSearchParams();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const searchResults = await handleSearch(query);
      if (ref && 'current' in ref && ref.current) {
        ref.current.setResults(searchResults);
      }
      localStorage.setItem('query', query);
      setSearchParams({ query });
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    const prevQuery = localStorage.getItem('query');
    if (prevQuery) {
      setQuery(prevQuery);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    setResults: () => {}
  }));

  return (
    <section className={className}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearchChange}
      />
      {/* <Link to="/"> */}
      <button onClick={handleSearchSubmit}>Search</button>
      {/* </Link> */}
    </section>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
