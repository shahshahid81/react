// Without tanstack query
// import { useEffect, useState } from 'react';

// import LoadingIndicator from '../UI/LoadingIndicator.jsx';
// import ErrorBlock from '../UI/ErrorBlock.jsx';
// import EventItem from './EventItem.jsx';

// export default function NewEventsSection() {
//   const [data, setData] = useState();
//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8000/events');

//       if (!response.ok) {
//         const error = new Error('An error occurred while fetching the events');
//         error.code = response.status;
//         error.info = await response.json();
//         throw error;
//       }

//       const { events } = await response.json();

//       return events;
//     }

//     fetchEvents()
//       .then((events) => {
//         setData(events);
//       })
//       .catch((error) => {
//         setError(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, []);

//   let content;

//   if (isLoading) {
//     content = <LoadingIndicator />;
//   }

//   if (error) {
//     content = (
//       <ErrorBlock title="An error occurred" message="Failed to fetch events" />
//     );
//   }

//   if (data) {
//     content = (
//       <ul className="events-list">
//         {data.map((event) => (
//           <li key={event.id}>
//             <EventItem event={event} />
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   return (
//     <section className="content-section" id="new-events-section">
//       <header>
//         <h2>Recently added events</h2>
//       </header>
//       {content}
//     </section>
//   );
// }

// With tanstack query
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  // Note that useQuery function will be executed as well when we use the hook by default.
  const { data, isPending, isError, error } = useQuery({
    // key that will be used to cache the request, values in the array can be of any type. queryKey must be unique for each function to avoid using the cached data of one function for another.
    queryKey: ['events', { max: 3 }],
    // queryFn: ({ signal }) => fetchEvents({ signal, max: 3 }),
    // Using queryKey to avoid duplicate use of max keyword
    queryFn: ({ signal, queryKey }) => {
      return fetchEvents({
        signal,
        // queryKey is the array we set above, we are fetching the object with max key and spreading it here
        ...queryKey[1],
      });
    },

    // Time for which the data can be used without calling the API. Here, api won't be called for 5 minutes, after which new data will be fetched.
    staleTime: 5000,

    // Time after which cache is invalidated.
    // gcTime: 1000,
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events'}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
