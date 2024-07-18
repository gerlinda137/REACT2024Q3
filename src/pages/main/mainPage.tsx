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
import Pagination from '../../components/pagination/pagination';
import { Outlet, useLoaderData, useSearchParams } from 'react-router-dom';
import DetailedCard from '../../components/detailedCard/detailedCard';

export const mainPageLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const query =
    localStorage.getItem('query') || url.searchParams.get('query') || '';
  const page = parseInt(url.searchParams.get('page') || '1', 10);

  if (query) {
    const resultObject = await searchShows(query, page);
    const results = resultObject.Search;
    return {
      results,
      query,
      page,
      totalPages: Math.ceil(resultObject.totalResults / 10)
    };
  }

  return { results: [], query: '', page: 1, totalPages: 0 };
};

const MainPage: React.FC = () => {
  const { results, page, totalPages } = useLoaderData() as {
    results: Result[];
    page: number;
    totalPages: number;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef<SearchInputRef>(null);
  const detailedId = searchParams.get('detailed');

  const handleSearch = async (query: string, page: number = 1) => {
    setLoading(true);

    try {
      const results = await searchShows(query, page);
      setSearchParams({ query, page: page.toString() });
      localStorage.setItem('query', query);
      setLoading(false);
      return results;
    } catch (error) {
      console.error('Error searching shows:', error);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.setResults(results);
    }
  }, [results]);

  return (
    <div className="main-page__wrapper">
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
            <div className="results__inner">
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
              <Pagination currentPage={page} totalPages={totalPages} />
            </div>
          ) : (
            <p>No results found</p>
          )}
        </section>
      </section>
      {detailedId && <DetailedCard />}
      <Outlet />
    </div>
  );
};

export default MainPage;
