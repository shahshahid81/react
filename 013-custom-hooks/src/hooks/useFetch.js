import { useEffect, useState } from "react";

/*
Hooks should start with use prefix because it will help the linter ensure that we use the hook properly without breaking the rules of hook
*/
export function useFetch(fetchedFn, initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchedFn();
        setFetchedData(places);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user places.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  // We can return anything just like a normal function.
  return {
    fetchedData,
    isFetching,
    error,
    setFetchedData
  }
}