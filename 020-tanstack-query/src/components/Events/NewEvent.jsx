import { client, createNewEvent } from '../../util/http.js';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventForm from './EventForm.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  const { isPending, error, isError, mutate } = useMutation({
    mutationFn: createNewEvent,
    // run when mutation is successful
    onSuccess: () => {
      navigate('/events');
      client.invalidateQueries({
        // This will invalidate all the query keys that have events as the prefix in the queryKey
        queryKey: ['events'],
        // Below option will allow us to only invalidate those queries with exact match as the above queryKey
        // exact: true
      });
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message || 'Something went wrong while creating event.'
          }
        />
      )}
    </Modal>
  );
}
