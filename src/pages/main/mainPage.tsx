import React, { useState, useRef, useEffect } from 'react';
import Card from '../../components/card/card';
import ErrorTrigger from '../../components/errorTriggerBtn/errorTriggerBtn';
import SearchLoader from '../../components/loader/loader';
import SearchInput, {
  SearchInputRef
} from '../../components/searchInput/searchInput';
import { SearchResult, searchShows } from '../../api/apiHandler';
import './_mainPage.scss';

const MainPage: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchInputRef = useRef<SearchInputRef>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const results = await searchShows(query);
    if (searchInputRef.current) {
      searchInputRef.current.setResults(results);
    }
    setResults(results);
    setLoading(false);
    return results;
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
};

export default MainPage;
