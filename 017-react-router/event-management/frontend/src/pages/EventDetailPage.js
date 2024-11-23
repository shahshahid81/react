import {
  defer,
  json,
  redirect,
  useRouteLoaderData,
  Await,
} from 'react-router-dom';
import { Suspense } from 'react';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

export default function EventDetail() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent}></EventItem>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event' },
      { status: 500 }
    );
  }

  const data = await response.json();
  return data.event;
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events/');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for events' },
      { status: 500 }
    );
  }

  const data = await response.json();
  return data.events;
}

// Params of the page is sent to loader function
export async function loader({ params }) {
  return defer({
    // Added await so that we can resolve the promise before sending
    event: await loadEvent(params.id),

    // No await because we don't want to wait for data
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const response = await fetch('http://localhost:8080/events/' + params.id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete selected event' }, { status: 500 });
  }

  return redirect('/events');
}
