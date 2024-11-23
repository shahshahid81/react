import { Outlet } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';

function Events() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default Events;