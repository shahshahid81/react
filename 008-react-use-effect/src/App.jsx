import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// We also could have added this code inside useEffect, however, we don't need to since the code is synchronous and since it only needs to execute once, we can pull the code out of the method and use the constant directly.
const storeIds = JSON.parse(localStorage.getItem('selectedPlaces') || '[]');
const storedPlaces = storeIds.map((storeId) =>
  AVAILABLE_PLACES.find((place) => place.id === storeId)
);

function App() {
  // const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [availablePlaces, setAvailablePlaces] = useState([]);

  // Execute after component function execution on start and after change in dependencies
  useEffect(
    () => {
      // If we dont use useEffect, then an infinite loop can occur. Uncomment the below code to get infinite console logs.
      // console.log('getCurrentPosition called');

      // Browser Web API to get location.
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.longitude
        );
        setAvailablePlaces(sortedPlaces);
      });
    },
    // We have to provide dependencies in the array so that side effect can be executed every time the dependencies chagnes. Here, we have provided an empty array which means that it won't change and the effect will be executed only once.
    []
  );

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // We could have used useEffect to store the data in localStorage which is a side effect and not related to react component logic needed to render the JSX code however not every side effect has to be executed using useEffect which is a bad practice
    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces') || '[]');
    if (!storeIds.includes(id)) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storeIds]));
    }
  }

  // UseCallback will memoize function and won't recreate it unless dependencies changes
  const handleRemovePlace = useCallback(function () {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setModalIsOpen(false);

    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces') || '[]');
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(
        storeIds.filter((storeId) => storeId !== selectedPlace.current)
      )
    );
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
