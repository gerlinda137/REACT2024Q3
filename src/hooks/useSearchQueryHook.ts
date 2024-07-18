import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const storedQuery = localStorage.getItem('query');
    const urlQuery = searchParams.get('query');
    if (urlQuery) {
      setQuery(urlQuery);
      localStorage.setItem('query', urlQuery);
    } else if (storedQuery) {
      setQuery(storedQuery);
      setSearchParams({ query: storedQuery });
    }

    return () => {
      if (query) {
        localStorage.setItem('query', query);
      }
    };
  }, [searchParams, query, setSearchParams]);

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
    setSearchParams({ query: newQuery });
  };

  return [query, updateQuery] as const;
};

export default useSearchQuery;
