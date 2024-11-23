import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import EventsRootLayout, { loader as eventsLoader } from './pages/Events';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import EventsPage from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import EventDetailPage, {
  loader as eventDetailsLoader,
  action as eventDetailsAction,
} from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import NewsletterPage, { action as newsletterAction } from './pages/NewsletterPage';
import { action as eventsManipulateAction } from './components/EventForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsPage />,
        children: [
          {
            index: true,
            element: <EventsRootLayout />,
            // Function that will be executed to provide the data to the component before rendering. Component will be rendered only when the function execution is complete and data will always be available in the component.
            // Note that we cannot use hooks in the function since the loader is not a React component
            loader: eventsLoader,
          },
          {
            path: ':id',
            // Defining id for route loader
            id: 'event-detail',
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDetailsAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: eventsManipulateAction,
              },
            ],
          },
          // Note that we have generic route with wild card above the new card. Router will check for more specific route so if we use /new route, then new path will be matched instead of :id. So the sequence here doesn't matter.
          {
            path: 'new',
            element: <NewEventPage />,
            // action method that will be used with Form component which will call the post api and handle the success and error cases.
            action: eventsManipulateAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
