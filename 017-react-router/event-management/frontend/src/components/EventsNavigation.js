import { NavLink } from 'react-router-dom';
import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  function activeClassHandler({ isActive }) {
    return isActive ? classes.active : undefined;
  }


  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink className={activeClassHandler} relative='path' to="" end>All Events</NavLink>
          </li>
          <li>
            <NavLink className={activeClassHandler} to="new">New Event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
