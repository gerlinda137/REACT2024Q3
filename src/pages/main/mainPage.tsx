import React, { useState, useRef, useEffect } from 'react';
import Card from '../../components/card/card';
import ErrorTrigger from '../../components/errorTriggerBtn/errorTriggerBtn';
import SearchLoader from '../../components/loader/loader';
import SearchInput, {
  SearchInputRef
} from '../../components/searchInput/searchInput';
import { searchShows } from '../../api/apiHandler';
import './mainPage.scss';
import { Result } from '../../interfaces/interfaces';

const MainPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchInputRef = useRef<SearchInputRef>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const results = await searchShows(query);
      setResults(results);
      if (searchInputRef.current) {
        searchInputRef.current.setResults(results);
      }
      setLoading(false);
      return results;
    } catch (error) {
      console.error('Error searching shows:', error);
      setLoading(false);
      setResults([]); // Reset results on error
      return [];
    }
  };

  useEffect(() => {
    const getInitialResults = async () => {
      const query = localStorage.getItem('query');
      if (query) {
        const results = await handleSearch(query);
        setResults(results);
      }
    };

    getInitialResults();
  }, []);

  return (
    <section className="main-page">
      <ErrorTrigger />
      <SearchInput
        className="search-input"
        placeholder="Enter your search term..."
        handleSearch={handleSearch}
        ref={searchInputRef}
      />
      <section className="results">
        {loading ? (
          <SearchLoader isLoading={loading} text="Loading..." />
        ) : results.length > 0 ? (
          <div className="card-container">
            {results.map((result) =>
              result ? (
                <Card
                  key={result.imdbID}
                  id={result.imdbID}
                  title={result.Title}
                  year={result.Year}
                  image={result.Poster}
                  className="result-card"
                />
              ) : null
            )}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </section>
    </section>
  );
};

export default MainPage;
