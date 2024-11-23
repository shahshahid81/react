// Without Defer

// import EventsList from '../components/EventsList';
// import { useLoaderData, json } from 'react-router-dom';

// function EventsPage() {
//   // Here, we are getting the data since we are returning response in the loader method.
//   const data = useLoaderData();

//   // We will be using errorElement for showing error. However, below technique can also be used.
//   // if (data.isError) { return <p>{data.message}</p>; }

//   return <EventsList events={data.events} />;
// }

// export default EventsPage;

// export async function loader() {
//   const response = await fetch('http://localhost:8080/events');

//   if (!response.ok) {
//     // return { isError: true, message: 'Something went wrong' };

//     // When we throw an error from loader function, the nearest errorElement is rendered.
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), { status: 500 });

//     // Helper method for creating response with json
//     throw json({ message: 'Could not fetch events.' }, { status: 500 });
//   } else {
//     // const resData = await response.json();
//     // return resData.events;

//     // Here, we are returning the response directly instead of extracting the json becaue we are returning an object of type Response and this will be handled by the useLoaderData hook automatically. We can return any data of data we want from the loader function.
//     return response;
//   }
// }

// With Defer
import EventsList from '../components/EventsList';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';

function EventsPage() {
  const { events } = useLoaderData();

  // Suspense will wait for the value to be resolved and then show the component. Meanwhile, fallback content is used.
  return <Suspense fallback={<p style={{ 'textAlign': 'center' }}>Loading...</p>}>
    {/* This will render the data returned from defer */}
    <Await resolve={events}>
      {/* Note that below function is passed as children prop and is executed to render the component */}
      {(loadedEvents) => <EventsList events={loadedEvents} />}
    </Await>
  </Suspense>;
}

export default EventsPage;

async function loadedEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadedEvents(),
  })
}