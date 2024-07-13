import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { SearchResult } from '../../api/apiHandler';
import './searchInput.scss';

interface SearchProps {
  className: string;
  placeholder: string;
  handleSearch: (query: string) => Promise<SearchResult[]>;
}

export interface SearchInputRef {
  setResults: (results: SearchResult[]) => void;
}

const SearchInput = forwardRef<SearchInputRef, SearchProps>((props, ref) => {
  const { className, placeholder, handleSearch } = props;
  const [query, setQuery] = useState('');

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
      <button onClick={handleSearchSubmit}>Search</button>
    </section>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
