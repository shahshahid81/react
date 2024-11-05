import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedAvailablePlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sortedLocations = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(sortedLocations);
      },
      (error) => {
        if (error.code === 1) {
          resolve(places);
        } else {
          reject(new Error(error.message));
        }
      }
    );
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [isFetching, setIsFetching] = useState(false);
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchPlaces() {
  //     setIsFetching(true);

  //     try {
  //       const places = await fetchAvailablePlaces();

  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const sortedLocations = sortPlacesByDistance(
  //             places,
  //             position.coords.latitude,
  //             position.coords.longitude
  //           );
  //           setAvailablePlaces(sortedLocations);
  //           setIsFetching(false);
  //         },
  //         (error) => {
  //           if (error.code === 1) {
  //             setAvailablePlaces(places);
  //           } else {
  //             throw new Error(error.message);
  //           }
  //           setIsFetching(false);
  //         }
  //       );
  //     } catch (error) {
  //       setError({
  //         message:
  //           error.message || 'Could not fetch places, please try again later.',
  //       });
  //       setIsFetching(false);
  //     }
  //   }

  //   fetchPlaces();
  // }, []);

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedAvailablePlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
