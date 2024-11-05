import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import Error from './components/Error.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getUserPlaces() {
      try {
        setIsFetching(true);
        const data = await fetchUserPlaces();
        setUserPlaces(data);
        setIsFetching(false);
      } catch (error) {
        setError(error.message || 'Something went wrong');
        setIsFetching(false);
      }
    }

    getUserPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // We can keep the event handler as async function
  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      // Note that the setState method is not updated instantly but scheduled so we are creating a copy of data based on previous state instead of the updated state
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      // We are reverting the state update if any error in api
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed updating places',
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        // Note that the setState method is not updated instantly but scheduled so we are creating a copy of data based on previous state instead of the updated state
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        // We are reverting the state update if any error in api
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed deleting places',
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {/* Added the condition because we are accessing message key of errorUpdatingPlaces which will be null initally and the component will crash */}
        {errorUpdatingPlaces && (
          <Error
            title="An error occured!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

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
          isLoading={isFetching}
          loadingText={'Fetching user places...'}
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
