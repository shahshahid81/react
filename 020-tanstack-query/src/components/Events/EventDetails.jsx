import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { client, deleteEvent, fetchEvent } from '../../util/http.js';
import { useState } from 'react';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const {
    mutate,
    isError: isMutationError,
    error: mutationError,
    isPending: isMutationPending,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      setIsDeleting(false);
      navigate('/events');
      client.invalidateQueries({
        queryKey: ['events'],
        // Don't refect the data, just invalidate the data
        refetchType: 'none',
      });
    },
  });

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function deleteHandler() {
    mutate({ id: params.id });
  }

  let content;
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Error Loading Event Details"
          message={error.info?.message || 'Failed to load event details.'}
        />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button
              disabled={isMutationPending}
              onClick={() => setIsDeleting(true)}
            >
              Delete
            </button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:8000/${data.image}`} alt={data.image} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`${data.date}T${data.time}`}>
                {Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(data.date))}{' '}
                @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete the event?</p>
          <div id="form-actions">
            {isMutationPending && <p>Deleting...</p>}
            {!isMutationPending && (
              <>
                <button className="button-text" onClick={handleStopDelete}>
                  Cancel
                </button>
                <button className="button" onClick={deleteHandler}>
                  Delete
                </button>
              </>
            )}
          </div>

          {isMutationError && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                mutationError.info?.message ||
                'Something went wrong while deleting event.'
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
