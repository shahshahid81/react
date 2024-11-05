import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const sortedLocations = sortPlacesByDistance(
              places,
              position.coords.latitude,
              position.coords.longitude
            );
            setAvailablePlaces(sortedLocations);
            setIsFetching(false);
          },
          (error) => {
            if (error.code === 1) {
              setAvailablePlaces(places);
            } else {
              throw new Error(error.message);
            }
            setIsFetching(false);
          }
        );
      } catch (error) {
        setError({ message: error.message || 'Something went wrong.' });
        setIsFetching(false);
      }
    }

    // Component Function and useEffect callback can't be async.
    // So we have defined a function here that is async and we are calling the function
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="Error" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      places={availablePlaces}
      onSelectPlace={onSelectPlace}
    />
  );
}
